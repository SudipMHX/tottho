import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IAnalytics extends Document {
  profileId: Types.ObjectId
  date: string // YYYY-MM-DD
  views: number
  uniqueVisitors: number
  clickData: { linkId: Types.ObjectId; count: number }[]
}

const AnalyticsSchema = new Schema<IAnalytics>({
  profileId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  views: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  clickData: [
    {
      linkId: { type: Schema.Types.ObjectId, ref: 'Link' },
      count: { type: Number, default: 0 },
    },
  ],
})

AnalyticsSchema.index({ profileId: 1, date: 1 }, { unique: true })

const Analytics: Model<IAnalytics> =
  mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema)
export default Analytics
