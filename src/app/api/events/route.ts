import { connectDB } from '@/lib/mongodb';
import Event from '@/models/Event';
import { NextRequest, NextResponse } from 'next/server';

function buildExpireAt(input: { expireAt?: string | Date; date?: string; time?: string }) {
  if (input.expireAt) {
    const parsed = new Date(input.expireAt);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  if (!input.date) return null;

  // Keep events alive through the selected day by default.
  const fallback = new Date(`${input.date}T23:59:59.999`);
  if (Number.isNaN(fallback.getTime())) return null;
  return fallback;
}

export async function GET(req: NextRequest) {
  await connectDB();
  const events = await Event.find().sort({ name: 1 }).lean();
  const plainEvents = events.map((d) => ({ ...d, _id: d._id.toString() }));
  return NextResponse.json(plainEvents);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await connectDB();

  const expireAt = buildExpireAt(body);
  if (!expireAt) {
    return NextResponse.json(
      { message: 'Invalid expireAt/date value' },
      { status: 400 }
    );
  }

  const newEvent = await Event.create({ ...body, expireAt });
  return NextResponse.json({ ...newEvent.toObject(), _id: newEvent._id.toString() });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { _id,  ...update } = body;
  await connectDB();

  const expireAt = buildExpireAt(update);
  if (!expireAt) {
    return NextResponse.json(
      { message: 'Invalid expireAt/date value' },
      { status: 400 }
    );
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    _id,
    { ...update, expireAt },
    { new: true }
  ).lean();
  return NextResponse.json({ ...updatedEvent, _id: updatedEvent._id.toString() });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const id = body.id as string;
  await connectDB();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted', _id: id });
}
