import 'dotenv/config';
import connectToDatabase from '@/database/mongoose';

async function main() {
  try {
    const mongoose = await connectToDatabase();
    mongoose.connection.close();
  } catch (error) {
    console.error('Failed to connect to database', error);
    process.exit(1);
  }
}

main();
