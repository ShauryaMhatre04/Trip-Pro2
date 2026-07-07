"use client";

import { useState } from "react";
import { Backpack, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PackingAssistant() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [activities, setActivities] = useState("");

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  async function generatePackingList() {
    if (!destination || !days) {
      alert("Please enter destination and trip duration.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/ai/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "packing",
          destination,
          days,
          activities,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate packing list");
      }

      setItems(
        data.packing
          .split("\n")
          .filter((line) => line.trim() !== "")
      );
    } catch (err) {
      console.error(err);
    alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="packing" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-12 text-center">

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
            AI Packing Assistant
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Never Forget Anything Again
          </h2>

          <p className="mt-3 text-gray-500">
            Generate a personalized packing checklist using Groq AI.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left */}
<div className="glass rounded-3xl p-8 shadow-premium card-hover">

            <div className="space-y-5">

              <input
                className="w-full rounded-xl border p-4"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />

              <input
                className="w-full rounded-xl border p-4"
                placeholder="Trip Duration (Days)"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />

              <textarea
                rows={4}
                className="w-full rounded-xl border p-4"
                placeholder="Activities (Beach, Hiking, Shopping...)"
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
              />

              <Button
               onClick={generatePackingList}
               disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
               >
                <Sparkles className="mr-2 h-4 w-4" />

                {loading ? "Generating..." : "Generate Packing List"}

              </Button>

            </div>

          </div>

          {/* Right */}
           <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-premium card-hover">  

            <div className="mb-8 flex items-center gap-3">

              <Backpack className="text-amber-400" />
              <div className="mb-3 inline-flex rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
  AI Generated
</div>

              <h3 className="text-2xl font-bold">
                Packing Checklist
              </h3>

            </div>

            {items.length === 0 ? (

              <p className="text-white/70">
                Generate your packing checklist.
              </p>

            ) : (

              <div className="space-y-4">

                {items.map((item, index) => (

                 <div
  key={index}
  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/10 p-4 transition-all duration-300 hover:bg-white/20"
>
  <span className="mt-1 text-green-400 text-lg">
    ✓
  </span>

  <p className="text-sm leading-7 whitespace-pre-wrap">
    {item}
  </p>
</div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}