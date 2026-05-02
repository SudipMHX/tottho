'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Profile from '@/models/Profile'
import { createSession, deleteSession, getSession } from '@/lib/session'
import { sendVerificationEmail, sendWelcomeEmail } from '@/lib/email'
import { SignupSchema, LoginSchema, FormState } from '@/lib/definitions'

/* ── helpers ── */
function generateToken() {
  return randomUUID().replace(/-/g, '')
}

/* ── signup ── */
export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const validated = SignupSchema.safeParse(raw)
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const { username, email, password } = validated.data

  await connectDB()

  const existingUser = await User.findOne({ $or: [{ email }, { username }] })
  if (existingUser) {
    if (existingUser.email === email) {
      return { errors: { email: ['This email is already registered.'] } }
    }
    return { errors: { username: ['This username is already taken.'] } }
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const token = generateToken()
  const tokenExpires = new Date(Date.now() + 72 * 60 * 60 * 1000) // 72 hours

  const user = await User.create({
    email,
    password: hashedPassword,
    username,
    role: 'user',
    isEmailVerified: false,
    emailVerifyToken: token,
    emailVerifyExpires: tokenExpires,
  })

  // Create empty profile
  await Profile.create({ userId: user._id, displayName: username })

  // Send verification email (non-blocking — don't fail signup if email fails)
  try {
    await sendVerificationEmail(email, token)
  } catch (err) {
    console.error('[email] Failed to send verification email:', err)
  }

  // Create session with emailVerified = false
  await createSession({
    userId: String(user._id),
    role: user.role,
    username: user.username,
    emailVerified: false,
  })

  redirect('/verify-email/pending')
}

/* ── login ── */
export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const validated = LoginSchema.safeParse(raw)
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const { email, password } = validated.data

  await connectDB()

  const user = await User.findOne({ email })
  if (!user) {
    return { errors: { email: ['No account found with this email.'] } }
  }

  if (user.isBanned) {
    return { message: 'Your account has been suspended. Please contact support.' }
  }

  // OAuth users have no password
  if (!user.password) {
    return { message: 'This account uses social login (GitHub/Google). Please use that method.' }
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return { errors: { password: ['Incorrect password.'] } }
  }

  await createSession({
    userId: String(user._id),
    role: user.role,
    username: user.username,
    emailVerified: user.isEmailVerified,
  })

  if (!user.isEmailVerified) {
    redirect('/verify-email/pending')
  }

  redirect('/dashboard')
}

/* ── logout ── */
export async function logout() {
  await deleteSession()
  redirect('/login')
}


/* ── resendVerification ── */
export async function resendVerification(_?: string): Promise<{ success: boolean; message: string }> {
  const session = await getSession()
  if (!session) return { success: false, message: 'You must be logged in.' }

  await connectDB()

  const user = await User.findById(session.userId).select('email isEmailVerified emailVerifyToken emailVerifyExpires')
  if (!user) return { success: false, message: 'Account not found.' }
  if (user.isEmailVerified) return { success: false, message: 'Your email is already verified.' }

  const token = generateToken()
  user.emailVerifyToken = token
  user.emailVerifyExpires = new Date(Date.now() + 72 * 60 * 60 * 1000)
  await user.save()

  try {
    await sendVerificationEmail(user.email, token)
  } catch (err) {
    console.error('[email] Resend failed:', err)
    return { success: false, message: 'Failed to send email. Please try again.' }
  }

  revalidatePath('/verify-email/pending')
  return { success: true, message: 'Verification email sent! Check your inbox.' }
}
