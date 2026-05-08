'use server'

import { revalidatePath } from 'next/cache'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import Link from '@/models/Link'
import { getSession } from '@/lib/session'
import { ProfileUpdateSchema, LinkSchema, FormState } from '@/lib/definitions'

export async function updateProfile(state: FormState, formData: FormData): Promise<FormState> {
  const session = await getSession()
  if (!session) return { message: 'Unauthorized' }

  const raw = {
    displayName: formData.get('displayName'),
    bio: formData.get('bio'),
    seoTitle: formData.get('seoTitle'),
    seoDescription: formData.get('seoDescription'),
  }

  const validated = ProfileUpdateSchema.safeParse(raw)
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  await connectDB()
  await Profile.findOneAndUpdate({ userId: session.userId }, validated.data, { new: true })

  revalidatePath('/dashboard/settings')
  revalidatePath('/dashboard', 'layout')
  revalidatePath(`/${session.username}`)
  return { success: true, message: 'Profile updated!' }
}

export async function updateTheme(theme: string) {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')

  const validThemes = ['default', 'dark', 'gradient', 'glass', 'neon', 'geometric', 'gooey', 'beams', 'smoke', 'aurora', 'paper', 'grain', 'grid-light', 'grid-dark', 'confetti', 'glow-dark', 'glow-lime', 'interactive', 'stars', 'hills', 'vine', 'matrix', 'portfolio']
  if (!validThemes.includes(theme)) throw new Error('Invalid theme')

  await connectDB()
  await Profile.findOneAndUpdate({ userId: session.userId }, { theme })

  revalidatePath('/dashboard/appearance')
  revalidatePath('/dashboard', 'layout')
  revalidatePath(`/${session.username}`)
}

export async function updateAvatar(avatarUrl: string) {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')

  await connectDB()
  await Profile.findOneAndUpdate({ userId: session.userId }, { avatar: avatarUrl })

  revalidatePath('/dashboard/settings')
  revalidatePath('/dashboard', 'layout')
  revalidatePath(`/${session.username}`)
}

export async function addLink(formData: FormData) {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')

  const raw = {
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    icon: (formData.get('icon') as string) || 'FaLink',
  }

  const validated = LinkSchema.safeParse(raw)
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message)
  }

  await connectDB()

  const count = await Link.countDocuments({ userId: session.userId })
  await Link.create({ userId: session.userId, ...validated.data, order: count })

  revalidatePath('/dashboard/links')
  revalidatePath('/dashboard', 'layout')
  revalidatePath(`/${session.username}`)
}

export async function updateLink(linkId: string, data: { title?: string; url?: string; icon?: string; isActive?: boolean }) {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')

  const validated = LinkSchema.partial().safeParse(data)
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message)
  }

  await connectDB()
  await Link.findOneAndUpdate({ _id: linkId, userId: session.userId }, validated.data)

  revalidatePath('/dashboard/links')
  revalidatePath('/dashboard', 'layout')
  revalidatePath(`/${session.username}`)
}

export async function deleteLink(linkId: string) {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')

  await connectDB()
  await Link.findOneAndDelete({ _id: linkId, userId: session.userId })

  revalidatePath('/dashboard/links')
  revalidatePath('/dashboard', 'layout')
  revalidatePath(`/${session.username}`)
}

export async function reorderLinks(linkIds: string[]) {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')

  await connectDB()
  await Promise.all(
    linkIds.map((id, index) =>
      Link.findOneAndUpdate({ _id: id, userId: session.userId }, { order: index })
    )
  )

  revalidatePath('/dashboard/links')
  revalidatePath('/dashboard', 'layout')
  revalidatePath(`/${session.username}`)
}
