import mongoose from 'mongoose';
import { sendNewProductEmail } from '../email.js';
import { findAllUserEmails } from '../models/user.js';

export const db = mongoose.connection;

// disconnects the mongodb connection
export const disconnect = () => mongoose.connection.close();

// Creates the mongodb connection
const connectDB = async function(req, res, next) {
  if (mongoose.connections[0].readyState) {
    return next();
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB Server");

    initChangeStream();
  } catch (err) {
    console.error("MONGODB ERROR: " + err);
  }

  mongoose.connection.on('error', (err) => {
    console.error("MONGODB ERROR: " + err);
  });

  next();
}

// Send email to all registered users whenever new product is added
const initChangeStream = async () => {
  const collection = db.collection("Products");
  const changeStream = collection.watch();

  changeStream.on("change", async (change) => {
    if (change.operationType === "insert") {
      const product = change.fullDocument;
      const users = await findAllUserEmails();
      await sendNewProductEmail(users, product);
    }
  });
}

export default connectDB;