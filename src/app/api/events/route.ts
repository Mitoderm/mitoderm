import { connectDB } from '@/lib/mongodb';
import Event from '@/models/Event';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await connectDB();
  const events = await Event.find().sort({ name: 1 }).lean();
  const plainEvents = events.map((d) => ({ ...d, _id: d._id.toString() }));
  return NextResponse.json(plainEvents);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await connectDB();

  const newEvent = await Event.create(body);
  return NextResponse.json({ ...newEvent.toObject(), _id: newEvent._id.toString() });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { _id,  ...update } = body;
  await connectDB();

  const updatedEvent = await Event.findByIdAndUpdate(_id, update, { new: true }).lean();
  return NextResponse.json({ ...updatedEvent, _id: updatedEvent._id.toString() });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const id = body.id as string;
  await connectDB();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted', _id: id });
}
