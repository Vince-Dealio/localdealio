// ✅ Full code for src/app/api/claim/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { username, email } = await req.json() as { username?: string; email?: string };

    if (!username || !email) {
      return NextResponse.json({ error: 'Missing username or email' }, { status: 400 });
    }

    const uname = String(username).trim().toLowerCase();
    const mail = String(email).trim().toLowerCase();

    // Avoid duplicate pending claims
    const existing = await prisma.pendingUser.findFirst({
      where: { OR: [{ username: uname }, { email: mail }] },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json({ error: 'Already pending or taken' }, { status: 409 });
    }

    await prisma.pendingUser.create({
      data: { username: uname, email: mail },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Claim error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
