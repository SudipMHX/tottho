import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IProfile extends Document {
  userId: Types.ObjectId
  displayName: string
  bio: string
  avatar: string
  theme: 'default' | 'dark' | 'gradient' | 'glass' | 'neon' | 'geometric' | 'gooey' | 'beams' | 'smoke' | 'aurora' | 'paper' | 'grain' | 'grid-light' | 'grid-dark' | 'confetti' | 'glow-dark' | 'glow-lime' | 'interactive' | 'stars' | 'hills' | 'vine' | 'matrix'
  isShowcased: boolean
  seoTitle: string
  seoDescription: string
  createdAt: Date
  updatedAt: Date
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    displayName: { type: String, default: '' },
    bio: { type: String, maxlength: 160, default: '' },
    avatar: { type: String, default: '' },
    theme: {
      type: String,
      enum: ['default', 'dark', 'gradient', 'glass', 'neon', 'geometric', 'gooey', 'beams', 'smoke', 'aurora', 'paper', 'grain', 'grid-light', 'grid-dark', 'confetti', 'glow-dark', 'glow-lime', 'interactive', 'stars', 'hills', 'vine', 'matrix'],
      default: 'default',
    },
    isShowcased: { type: Boolean, default: false },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
)

const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema)
export default Profile
