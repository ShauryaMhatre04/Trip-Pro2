"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Plane,
  MapPin,
  CloudSun,
  Backpack,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingCards from "./FloatingCards";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8ED] via-[#FFFDF8] to-white pt-32 pb-24">

      {/* Background Blur */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-amber-300/20 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300/20 blur-[140px]" />

      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
        >

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

            <Sparkles className="h-4 w-4" />

            AI Powered Travel Planner

          </div>

          <h1 className="font-display text-5xl font-bold leading-tight text-slate-900 lg:text-7xl">

            Plan Smarter.

            <br />

            <span className="text-amber-500">

              Travel Better.

            </span>

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">

            Build intelligent itineraries, monitor your travel budget,
            receive live weather forecasts, and generate smart packing
            lists—all in one AI-powered travel companion.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Button
              href="/signup"
              size="lg"
              className="rounded-full bg-amber-500 px-8 hover:bg-amber-600"
            >

              Start Planning

              <ArrowRight className="ml-2 h-4 w-4"/>

            </Button>

            <Button
              href="#features"
              variant="outline"
              size="lg"
              className="rounded-full"
            >

              Explore Features

            </Button>

          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">

            <div>

              <h2 className="text-3xl font-bold text-slate-900">

                15K+

              </h2>

              <p className="mt-2 text-sm text-slate-500">

                Trips Planned

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-slate-900">

                98%

              </h2>

              <p className="mt-2 text-sm text-slate-500">

                Budget Accuracy

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-slate-900">

                50+

              </h2>

              <p className="mt-2 text-sm text-slate-500">

                Countries

              </p>

            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div

          initial={{ opacity:0, scale:.9 }}

          animate={{ opacity:1, scale:1 }}

          transition={{ duration:1 }}

          className="relative flex justify-center"

        >

          {/* Boarding Ticket */}

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

            <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white">

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">

                  Trip Ticket

                </h3>

                <Plane className="rotate-45"/>

              </div>

            </div>

            <div className="space-y-6 p-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase text-gray-500">

                    From

                  </p>

                  <h2 className="text-3xl font-bold">

                    Pune

                  </h2>

                </div>

                <Plane className="text-amber-500"/>

                <div>

                  <p className="text-xs uppercase text-gray-500">

                    To

                  </p>

                  <h2 className="text-3xl font-bold">

                    Bali

                  </h2>

                </div>

              </div>

              <div className="border-t border-dashed"></div>

              <div className="grid grid-cols-2 gap-6">

                <div>

                  <p className="text-sm text-gray-500">

                    Budget

                  </p>

                  <h3 className="text-xl font-bold">

                    ₹60,000

                  </h3>

                </div>

                <div>

                  <p className="text-sm text-gray-500">

                    Duration

                  </p>

                  <h3 className="text-xl font-bold">

                    7 Days

                  </h3>

                </div>

              </div>

            </div>

          </div>

          <FloatingCards />

        </motion.div>

      </div>

    </section>
  );
}