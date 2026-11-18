import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IMegalinkLead extends Document {
  reference: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  ip?: string;
  userAgent?: string;
  referer?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  webhookStatus: 'pending' | 'delivered' | 'failed';
  webhookError?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MegalinkLeadSchema = new Schema<IMegalinkLead>(
  {
    reference: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true },
    message: { type: String, default: '' },
    ip: { type: String },
    userAgent: { type: String },
    referer: { type: String },
    utm: {
      source: String,
      medium: String,
      campaign: String,
      term: String,
      content: String,
    },
    webhookStatus: {
      type: String,
      enum: ['pending', 'delivered', 'failed'],
      default: 'pending',
      index: true,
    },
    webhookError: { type: String },
  },
  {
    collection: 'megalink_leads',
    timestamps: true,
  }
);

export const MegalinkLead: Model<IMegalinkLead> =
  mongoose.models.MegalinkLead || mongoose.model<IMegalinkLead>('MegalinkLead', MegalinkLeadSchema);

