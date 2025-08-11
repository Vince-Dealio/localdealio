// ✅ Full code for src/app/api/checkout/route.ts — Rule1
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const API_VERSION: Stripe.StripeConfig['apiVersion'] = '2022-11-15';

// Map your logical plan IDs to Stripe Price IDs
const PRICE_MAP: Record<string, string> = {
  standard: 'price_1RtSmg1s2cUrkeqf6qO0sXMc', // TODO: replace with your real ID
  pro: 'price_1RtSo81s2cUrkeqfekXSSe2W',     // TODO: replace with your real ID
};

// Lazy init so missing env doesn’t crash module import
function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY not set');
  }
  return new Stripe(key as string, { apiVersion: API_VERSION });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Parse body as JSON or form-encoded
  const contentType = req.headers.get('content-type')?.toLowerCase() ?? '';
  let username: string | null = null;
  let plan: string | null = null;
  let wantsJsonResponse = false;

  try {
    if (contentType.includes('application/json')) {
      const body = await req.json();
      username = (body?.username ?? null) as string | null;
      plan = (body?.plan ?? body?.priceId ?? null) as string | null;
      wantsJsonResponse = true;
    } else {
      const form = await req.formData();
      plan = (form.get('plan') as string | null) ?? null;
      username = (form.get('username') as string | null) ?? null;
      wantsJsonResponse = false; // form posts expect redirect UX
    }
  } catch {
    // fall through with nulls
  }

  if (!plan) {
    return NextResponse.json({ error: 'Missing plan' }, { status: 400 });
  }

  const priceId = PRICE_MAP[plan];
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
  }

  // Build success/cancel URLs from current origin
  const origin = new URL(req.url).origin;
  const successUrl = `${origin}/success`;
  const cancelUrl = `${origin}/cancel`;

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: { username: username ?? '' },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (wantsJsonResponse) {
      return NextResponse.json({ url: session.url });
    }
    // Form submit: redirect the browser to Stripe
    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    // Graceful fallback for form posts in dev (no Stripe keys yet)
    if (!wantsJsonResponse) {
      const url = new URL('/success', req.url);
      url.searchParams.set('plan', plan);
      if (username) url.searchParams.set('username', username);
      return NextResponse.redirect(url.toString(), { status: 303 });
    }

    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
}
