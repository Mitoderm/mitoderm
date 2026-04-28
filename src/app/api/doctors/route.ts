import { connectDB } from '@/lib/mongodb';
import Doctor from '@/models/Doctor';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['he', 'en', 'ru'] as const;
const doctorPages = ['', '/exosignal_hair', '/exosignalhairspray', '/exotechgel'];

const revalidateDoctorPages = () => {
  for (const locale of locales) {
    for (const page of doctorPages) {
      revalidatePath(`/${locale}${page}`);
    }
    revalidatePath(`/${locale}/admin/doctors`);
  }
};

export async function GET(req: NextRequest) {
  await connectDB();
  const doctors = await Doctor.find().sort({ name: 1 }).lean();
  const plainDoctors = doctors.map((d) => ({ ...d, _id: d._id.toString() }));
  return NextResponse.json(plainDoctors);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await connectDB();

  const newDoctor = await Doctor.create(body);
  revalidateDoctorPages();
  return NextResponse.json({ ...newDoctor.toObject(), _id: newDoctor._id.toString() });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { _id, ...update } = body;
  await connectDB();

  const updatedDoctor = await Doctor.findByIdAndUpdate(_id, update, { new: true }).lean();
  revalidateDoctorPages();
  return NextResponse.json({ ...updatedDoctor, _id: updatedDoctor._id.toString() });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const id = body._id;
  await connectDB();
  await Doctor.findByIdAndDelete(id);
  revalidateDoctorPages();
  return NextResponse.json({ message: 'Deleted', _id: id });
}
