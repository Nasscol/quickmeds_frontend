import React from 'react'
import { Login } from '@/componentPages'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const page = async() => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (token) {
    redirect('/dashboard');
  }

  return (
    <Login />
  )
}

export default page