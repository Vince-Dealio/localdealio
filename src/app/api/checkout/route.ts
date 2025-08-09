// ✅ Full code for src/app/api/checkout/route.ts with working plan to Stripe mapping

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

// Replace these with your real Stripe price IDs
const PRICE_MAP: Record<string, string> = {
  standard: 'price_1RtSmg1s2cUrkeqf6qO0sXMc', // 🔁 Replace with real ID
  pro: 'price_1RtSo81s2cUrkeqfekXSSe2W',           // 🔁 Replace with real ID
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { username, plan } = await req.json();

  if (!username || !plan) {
    return NextResponse.json({ error: 'Missing username or plan' }, { status: 400 });
  }

  const priceId = PRICE_MAP[plan];
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: { username },
      success_url: 'https://digi.site/success',
      cancel_url: 'https://digi.site/cancel',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('🔥 Stripe checkout error:', error);
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
}
