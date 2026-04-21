import { getEvents } from '@/lib/mongodb';
import AdminProgramsPage from '@/components/Admin/AdminProgramsPage/AdminsProgramsPage';

export default async function ProgramsRoute() {
  const events = await getEvents();
  const plainEvents = events.map((e) => ({
    id: e._id,
    category: e.category,
    city: e.city,
    date: e.date,
    time: e.time,
    isAvailable: e.isAvailable,
    expireAt: e.expireAt,
  }));

  return <AdminProgramsPage events={plainEvents} />;
}

export const dynamic = 'force-dynamic';
