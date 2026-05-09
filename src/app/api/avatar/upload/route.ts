import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import { revalidatePath } from 'next/cache'
import path from 'path'
import fs from 'fs/promises'
import sharp from 'sharp'

const AVATARS_DIR = path.join(process.cwd(), 'public', 'avatars')
const MAX_SIZE_KB = 500

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('avatar') as File | null

    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file. Please upload an image.' }, { status: 400 })
    }

    // Max upload size guard: 4MB raw
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum upload size is 4MB.' }, { status: 400 })
    }

    // Read the file as a Buffer
    const arrayBuffer = await file.arrayBuffer()
    const inputBuffer = Buffer.from(arrayBuffer)
    const originalSizeKB = inputBuffer.length / 1024

    let outputBuffer: Buffer

    if (originalSizeKB <= MAX_SIZE_KB) {
      // Already within limit — just convert to webp for efficiency
      outputBuffer = await sharp(inputBuffer)
        .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 90 })
        .toBuffer()
    } else {
      // Need to resize down. Start with quality=85 and reduce until under MAX_SIZE_KB
      // but try to keep it above 100KB for decent quality.
      let quality = 85
      let width = 800

      outputBuffer = await sharp(inputBuffer)
        .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toBuffer()

      // Iteratively reduce quality
      while (outputBuffer.length > MAX_SIZE_KB * 1024 && quality > 30) {
        quality -= 10
        outputBuffer = await sharp(inputBuffer)
          .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
          .webp({ quality })
          .toBuffer()
      }

      // If still too large, start reducing dimensions too
      if (outputBuffer.length > MAX_SIZE_KB * 1024) {
        width = 600
        quality = 80
        outputBuffer = await sharp(inputBuffer)
          .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
          .webp({ quality })
          .toBuffer()
      }

      // Last resort: 400px at quality 70
      if (outputBuffer.length > MAX_SIZE_KB * 1024) {
        outputBuffer = await sharp(inputBuffer)
          .resize({ width: 400, height: 400, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 70 })
          .toBuffer()
      }
    }

    // Ensure avatars directory exists
    await fs.mkdir(AVATARS_DIR, { recursive: true })

    // Delete previous avatar if it was a local file
    await connectDB()
    const existingProfile = await Profile.findOne({ userId: session.userId }).select('avatar').lean()
    if (existingProfile?.avatar?.startsWith('/avatars/')) {
      const oldFilePath = path.join(process.cwd(), 'public', existingProfile.avatar)
      try { await fs.unlink(oldFilePath) } catch {}
    }

    // Write the optimized file
    const filename = `${session.userId}-${Date.now()}.webp`
    const filepath = path.join(AVATARS_DIR, filename)
    await fs.writeFile(filepath, outputBuffer)

    const avatarUrl = `/avatars/${filename}`

    // Update the profile
    await Profile.findOneAndUpdate(
      { userId: session.userId },
      { avatar: avatarUrl },
      { upsert: true }
    )

    revalidatePath('/dashboard/settings')
    revalidatePath('/dashboard', 'layout')
    revalidatePath(`/${session.username}`)

    return NextResponse.json({
      url: avatarUrl,
      originalSizeKB: Math.round(originalSizeKB),
      finalSizeKB: Math.round(outputBuffer.length / 1024),
    })
  } catch (err) {
    console.error('[avatar/upload] error:', err)
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}
