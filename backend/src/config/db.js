import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Add colors to console output
import 'colors';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('\n=== MongoDB Connection ==='.cyan);
    console.log('Connecting to MongoDB...'.yellow);
    
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      family: 4, // Use IPv4, skip trying IPv6
    };
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`\n✅ MongoDB Connected: ${conn.connection.host}`.green.bold);
    console.log(`Database: ${conn.connection.name}`.cyan);
    console.log('MongoDB Connection Status: Connected\n'.green);
    
    // Log successful connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB'.green);
    });
    
    // Log connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error('\n❌ Mongoose connection error:'.red);
      console.error(err);
      console.error('\nTroubleshooting Tips:'.yellow);
      console.log('1. Check if MongoDB server is running'.yellow);
      console.log('2. Verify your MONGODB_URI in .env file'.yellow);
      console.log('3. Check your internet connection'.yellow);
      console.log('4. Verify MongoDB server accessibility'.yellow);
    });
    
    // Log when the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      console.log('\n⚠️  Mongoose connection disconnected'.yellow);
    });
    
    return conn;
    
  } catch (error) {
    console.error('\n❌ MongoDB Connection Error:'.red);
    console.error(error.message);
    
    console.log('\nTroubleshooting Steps:'.yellow);
    console.log('1. Check if MongoDB server is running'.yellow);
    console.log('2. Verify your MONGODB_URI in .env file'.yellow);
    console.log('3. Check your internet connection'.yellow);
    console.log('4. Verify MongoDB server accessibility'.yellow);
    
    process.exit(1);
  }
};

export default connectDB;
