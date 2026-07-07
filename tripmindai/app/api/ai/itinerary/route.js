import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getGroqClient, GROQ_TEXT_MODEL } from "@/lib/groq";

export async function POST(request)
           {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const {
      destination,
      budget,
      currency,
      startDate,
      endDate,
      interests,
      mode,
      activities,
      days: tripDays,
    } = await request.json();

    // Packing validation
    if (mode === "packing") {
      if (!destination || !tripDays) {
        return NextResponse.json(
          {
            error: "Destination and trip duration are required.",
          },
          { status: 400 }
        );
      }
    }

    // Itinerary validation
    if (mode !== "packing" && (!destination || !budget)) {
      return NextResponse.json(
        {
          error: "Destination and budget are required.",
        },
        { status: 400 }
      );
    }

    const days =
      startDate && endDate
        ? Math.max(
            1,
            Math.round(
              (new Date(endDate) - new Date(startDate)) / 86400000
            ) + 1
          )
        : Number(tripDays) || 3;

    const groq = getGroqClient();

    /* ---------------- PACKING MODE ---------------- */

    if (mode === "packing") {
      console.log("Generating Packing List...");

      const completion = await groq.chat.completions.create({
        model: GROQ_TEXT_MODEL,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "You are a travel packing assistant. Return ONLY a markdown checklist grouped into Documents, Clothing, Electronics, Toiletries, Medicines and Essentials.",
          },
          {
            role: "user",
            content: `
Destination: ${destination}

Trip Length: ${tripDays} days

Activities: ${activities || "General Tourism"}

Generate a complete packing checklist.
`,
          },
        ],
      });

      const packing =
        completion.choices?.[0]?.message?.content || "No packing list generated.";

      return NextResponse.json({ packing });
    }

    /* ---------------- ITINERARY MODE ---------------- */

    const completion = await groq.chat.completions.create({
      model: GROQ_TEXT_MODEL,
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content:
            "You are TripMindAI, a budget travel planner. Produce a realistic day-by-day itinerary within the user's budget. Return markdown with Day headings and a Budget Breakdown.",
        },
        {
          role: "user",
          content: `
Destination: ${destination}

Budget: ${currency || "USD"} ${budget}

Duration: ${days} days

Interests: ${
            interests || "general sightseeing, local food, walkable areas"
          }
`,
        },
      ],
    });

    const itinerary =
      completion.choices?.[0]?.message?.content || "No itinerary generated.";

    return NextResponse.json({
      itinerary,
      days,
    });
  } catch (err) {
    console.error("Groq Error:", err);

    return NextResponse.json(
      {
        error: err.message || "AI generation failed",
      },
      {
        status: 500,
      }
    );
  }
}