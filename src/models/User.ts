import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  role: 'user' | 'admin'
  username: string
  isBanned: boolean
  isEmailVerified: boolean
  emailVerifyToken: string | null
  emailVerifyExpires: Date | null
  oauthProvider: 'github' | 'google' | null
  oauthId: string | null
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, default: null },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    username: { type: String, unique: true, required: true, lowercase: true, trim: true },
    isBanned: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    emailVerifyToken: { type: String, default: null },
    emailVerifyExpires: { type: Date, default: null },
    oauthProvider: { type: String, enum: ['github', 'google', null], default: null },
    oauthId: { type: String, default: null },
  },
  { timestamps: true }
)

// In development, always re-compile with the latest schema.
// Next.js HMR keeps mongoose.models alive across reloads — without this,
// old cached models silently drop new fields (strict mode).
delete (mongoose.models as Record<string, unknown>)['User']
const User = mongoose.model<IUser>('User', UserSchema)
export default User
