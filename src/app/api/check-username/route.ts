// ✅ Full code for src/app/api/check-username/route.ts — typed, no ts-expect-error
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Reserved paths
const RESERVED = new Set([
  'admin','site-ctrl','ds-ctrl','login','signin','signup','logout','api',
  'settings','dashboard','plans','checkout','privacy','terms','contact',
  'claim','verify-email','_next','static','favicon.ico','robots.txt','sitemap.xml',
]);

function isValidUsername(u: string) {
  return /^[a-z0-9](?:[a-z0-9-]{1,28})[a-z0-9]$/.test(u);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = (searchParams.get('username') || '').toLowerCase().trim();

  if (!raw) return NextResponse.json({ available: false, reason: 'Empty' }, { status: 400 });
  if (!isValidUsername(raw)) return NextResponse.json({ available: false, reason: 'Invalid format' });
  if (RESERVED.has(raw)) return NextResponse.json({ available: false, reason: 'Reserved' });

  try {
    // Check Profile.username
    const existingProfile = await prisma.profile.findFirst({
      where: { username: raw },
      select: { id: true },
    });
    if (existingProfile) return NextResponse.json({ available: false, reason: 'Taken' });

    // Check PendingUser.username (model exists in your schema)
    const pending = await prisma.pendingUser.findFirst({
      where: { username: raw },
      select: { id: true },
    });
    if (pending) return NextResponse.json({ available: false, reason: 'Pending' });

    return NextResponse.json({ available: true });
  } catch {
    return NextResponse.json({ available: false, reason: 'Error' });
  }
}
