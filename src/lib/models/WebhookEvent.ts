import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IMegalinkWebhookEvent extends Document {
  eventType: string;
  payload: Record<string, any>;
  status: 'pending' | 'delivered' | 'failed';
  attempts: number;
  lastAttemptAt?: Date;
  lastError?: string;
  responseStatus?: number;
  createdAt: Date;
  updatedAt: Date;
}

const MegalinkWebhookEventSchema = new Schema<IMegalinkWebhookEvent>(
  {
    eventType: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ['pending', 'delivered', 'failed'],
      default: 'pending',
      index: true,
    },
    attempts: { type: Number, default: 0 },
    lastAttemptAt: { type: Date },
    lastError: { type: String },
    responseStatus: { type: Number },
  },
  {
    collection: 'megalink_webhook_events',
    timestamps: true,
  }
);

export const MegalinkWebhookEvent: Model<IMegalinkWebhookEvent> =
  mongoose.models.MegalinkWebhookEvent ||
  mongoose.model<IMegalinkWebhookEvent>('MegalinkWebhookEvent', MegalinkWebhookEventSchema);

