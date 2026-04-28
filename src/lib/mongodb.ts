import mongoose from 'mongoose';
import Doctor from '@/models/Doctor';
import Event from '@/models/Event';

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
    indexesReady: false,
  };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }
  cached.conn = await cached.promise;

  // Ensure TTL indexes exist in every environment; without this,
  // expired documents may never be removed on long-lived clusters.
  if (!cached.indexesReady) {
    await Event.createIndexes();
    cached.indexesReady = true;
  }

  return cached.conn;
}

export async function getDoctors() {
  await connectDB();
  const doctorList = await Doctor.find({})
  .sort({ name: 1 }).lean()

  const doctors = doctorList.map((doc) => ({
    _id: doc._id.toString(),
    name: doc.name,
    city: doc.city,
    area: doc.area,
    profession: doc.profession,
    contact: doc.contact,
    instagram: doc.instagram,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
  return doctors;
}

export async function getEvents() {
  await connectDB();
  const eventList = await Event.find().sort({ date: 1 }).lean();
  const events = eventList.map((event) => ({
    _id: event._id.toString(),
    category: event.category,
    city: event.city,
    date: event.date,
    time: event.time,
    isAvailable: event.isAvailable,
    expireAt: event.expireAt,
  }));
  return events;
}