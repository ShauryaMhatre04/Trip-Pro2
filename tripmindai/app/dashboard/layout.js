import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardNav from '@/components/DashboardNav';

export default async function DashboardLayout({ children }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense in depth: middleware already guards /dashboard, but every
  // server component that touches user data should verify independently.
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <DashboardNav email={user.email} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
