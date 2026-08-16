import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== 'ADMIN') redirect('/auth/login?callbackUrl=/admin');
  return session;
}
