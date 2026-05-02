import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface ILink extends Document {
  userId: Types.ObjectId
  title: string
  url: string
  icon: string
  order: number
  isActive: boolean
  clicks: number
  createdAt: Date
  updatedAt: Date
}

const LinkSchema = new Schema<ILink>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    icon: { type: String, default: 'FaLink' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
)

LinkSchema.index({ userId: 1, order: 1 })

const Link: Model<ILink> = mongoose.models.Link || mongoose.model<ILink>('Link', LinkSchema)
export default Link
