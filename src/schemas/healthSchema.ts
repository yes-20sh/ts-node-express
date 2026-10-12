import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHealth extends Document {
  status: string;
  count: number;
  lastCheckedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const healthSchema = new Schema<IHealth>(
  {
    status: {
      type: String,
      default: 'OK',
    },
    count: {
      type: Number,
      default: 0,
    },
    lastCheckedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Health: Model<IHealth> = mongoose.model<IHealth>('Health', healthSchema);

export default Health;
