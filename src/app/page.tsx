import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  
  const hasAccess = cookieStore.has('access_token');
  const hasRefresh = cookieStore.has('refresh_token');

  if (hasAccess || hasRefresh) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }

}

