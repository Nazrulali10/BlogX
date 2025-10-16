import mongoose from 'mongoose'

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn; // Return existing connection if already connected
  }

  if (!cached.promise) {
    mongoose.connection.on("connected", () => {
      console.log("✅ DATABASE CONNECTED SUCCESSFULLY");
    });
    mongoose.connection.on("error", (err) => {
      console.error("❌ DATABASE CONNECTION ERROR:", err);
    });

    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise; // Wait for the connection to finish
  return cached.conn; // Return the connection no matter what
}

export default connectDB;
