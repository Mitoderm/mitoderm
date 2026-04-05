import { redirect } from 'next/navigation';

export default async function AdminPage() {
  // redirect('/admin/programs');
  return (
    <div>
      <h2>Welcome to Admin</h2>
      <p>Manage your users and content here.</p>
    </div>
  );
}
