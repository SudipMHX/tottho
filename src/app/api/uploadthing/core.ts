import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { getSession } from '@/lib/session'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'

const f = createUploadthing()

export const ourFileRouter = {
  avatarUploader: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await getSession()
      if (!session) throw new Error('Unauthorized')
      return { userId: session.userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await connectDB()
      
      const avatarUrl = file.url || file.ufsUrl || '';
      
      await Profile.findOneAndUpdate(
        { userId: metadata.userId },
        { avatar: avatarUrl },
        { upsert: true }
      )
      
      return { url: avatarUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
