import connectToDatabase from '@/database/mongoose';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;

  if (!db) throw new Error('MongoDB connection not found');

  authInstance = betterAuth({
    database: mongodbAdapter(db),
    plugins: [nextCookies()],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
  });

  return authInstance;
};

export const auth = await getAuth();
