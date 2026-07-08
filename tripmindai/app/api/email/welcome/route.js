import { NextResponse } from 'next/server';
import { getResendClient, FROM_EMAIL } from '@/lib/resend';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  try {
    const { email, fullName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const resend = getResendClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const greetingName = fullName ? escapeHtml(fullName) : 'traveler';

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to TripMindAI',
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color:#16233A;">Welcome aboard, ${greetingName}!</h1>
          <p style="color:#3a4658; line-height:1.6;">
            Your TripMindAI account is ready. Create your first trip, set a budget,
            and let Groq AI build a day-by-day itinerary that fits it.
          </p>
          <p style="color:#3a4658; line-height:1.6;">
            Snap a photo of any receipt on the road and Groq Vision will log the
            expense for you automatically.
          </p>
          <p style="margin-top:24px;">
            <a href="${siteUrl}/login"
               style="background:#E8A33D;color:#16233A;padding:10px 20px;border-radius:999px;text-decoration:none;font-weight:600;">
              Start planning
            </a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend welcome email failed:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Welcome email route failed:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
