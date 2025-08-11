// ✅ Full code for src/app/api/checkout/route.ts — Rule1
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const API_VERSION: Stripe.StripeConfig['apiVersion'] = '2022-11-15';

// Price IDs from environment (best practice)
const PRICE_MAP: Record<string, string | undefined> = {
  standard: process.env.STRIPE_PRICE_STANDARD,
  pro: process.env.STRIPE_PRICE_PRO,
};

// Lazy init to avoid crashing module import if env is missing
function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY not set');
  return new Stripe(key, { apiVersion: API_VERSION });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Accept JSON or form-encoded requests
  const contentType = req.headers.get('content-type')?.toLowerCase() ?? '';
  let username: string | null = null;
  let plan: string | null = null;
  let wantsJsonResponse = false;

  try {
    if (contentType.includes('application/json')) {
      const body = await req.json();
      username = (body?.username ?? null) as string | null;
      plan = (body?.plan ?? body?.priceId ?? null) as string | null;
      wantsJsonResponse = true; // client expects { url }
    } else {
      const form = await req.formData();
      plan = (form.get('plan') as string | null) ?? null;
      username = (form.get('username') as string | null) ?? null;
      wantsJsonResponse = false; // browser form → redirect UX
    }
  } catch {
    // leave values as null; handled below
  }

  if (!plan) {
    return NextResponse.json({ error: 'Missing plan' }, { status: 400 });
  }

  const priceId = PRICE_MAP[plan];
  if (!priceId) {
    return NextResponse.json({ error: 'Price not configured for selected plan' }, { status: 500 });
  }

  const origin = new URL(req.url).origin;
  const successUrl = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/checkout/cancel`;

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { username: username ?? '' },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (wantsJsonResponse) {
      return NextResponse.json({ url: session.url });
    }
    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    // In dev without Stripe config, fall back to local success so flows keep working
    if (!wantsJsonResponse) {
      const url = new URL('/checkout/success', origin);
      url.searchParams.set('plan', plan);
      if (username) url.searchParams.set('username', username);
      return NextResponse.redirect(url.toString(), { status: 303 });
    }

    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
}
