import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getGroqClient, GROQ_VISION_MODEL } from '@/lib/groq';

const CATEGORIES = ['flights', 'stay', 'food', 'transport', 'activities', 'shopping', 'other'];

export async function POST(request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { imageBase64, mimeType } = await request.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'imageBase64 is required' }, { status: 400 });
    }

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: GROQ_VISION_MODEL,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text:
                'This image is a travel receipt, bill, or ticket. Extract the expense details. ' +
                `Respond ONLY with strict JSON: {"amount": number, "currency": "ISO code or symbol", ` +
                `"description": "short merchant/item description", "category": one of ${JSON.stringify(CATEGORIES)}, ` +
                '"spent_on": "YYYY-MM-DD if a date is visible, else null"}. ' +
                'If you cannot read an amount, set amount to 0.',
            },
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType || 'image/jpeg'};base64,${imageBase64}` },
            },
          ],
        },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content || '{}';
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { amount: 0, currency: 'USD', description: 'Could not parse receipt', category: 'other', spent_on: null };
    }

    if (!CATEGORIES.includes(parsed.category)) parsed.category = 'other';

    return NextResponse.json({ expense: parsed });
  } catch (err) {
    console.error('Groq vision error:', err);
    return NextResponse.json({ error: err.message || 'Vision analysis failed' }, { status: 500 });
  }
}
