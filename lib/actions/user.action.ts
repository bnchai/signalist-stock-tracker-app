'use server';

import connectToDatabase from '@/database/mongoose';

export const getAllUsersForNewsEmail = async (): Promise<User[]> => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error('Mongoose connection not connected');

    const users = await db
      .collection('user')
      .find(
        {
          email: { $exist: true, $ne: null },
        },
        {
          projection: {
            id: 1,
            email: 1,
            name: 1,
            country: 1,
          },
        }
      )
      .toArray();

    return users
      .filter((user) => user.email && user.name)
      .map((user) => ({
        id: user.id || user._id.toString() || '',
        email: user.email,
        name: user.name,
      }));
  } catch (error) {
    console.error('Error fetching users for news email', error);
    return [];
  }
};
