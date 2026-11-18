import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongo } from '@/lib/db';

export async function GET() {
  let dbStatus = 'disconnected';
  try {
    if (process.env.MONGODB_URI) {
      await connectMongo();
      dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'connecting';
    } else {
      dbStatus = 'unconfigured';
    }
  } catch (err: any) {
    dbStatus = `error: ${err.message}`;
  }

  return NextResponse.json({
    status: 'ok',
    service: 'megalink-landing-app',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    version: '1.0.0',
  });
}

