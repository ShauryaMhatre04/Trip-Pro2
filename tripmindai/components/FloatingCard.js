"use client";

import { motion } from "framer-motion";
import {
  CloudSun,
  Wallet,
  Backpack,
  CheckCircle2,
} from "lucide-react";

export default function FloatingCards() {
  return (
    <>
      {/* Weather Card */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute -left-10 top-8 hidden w-60 rounded-2xl border border-white/40 bg-white/90 p-5 shadow-2xl backdrop-blur-xl lg:block"
      >
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-semibold">Today's Weather</h4>
          <CloudSun className="h-7 w-7 text-amber-500" />
        </div>

        <h2 className="text-4xl font-bold">28°</h2>

        <p className="mt-1 text-sm text-gray-500">
          Bali, Indonesia
        </p>

        <div className="mt-5 flex justify-between text-sm">
          <div>
            <p className="text-gray-400">Humidity</p>
            <p className="font-semibold">72%</p>
          </div>

          <div>
            <p className="text-gray-400">Wind</p>
            <p className="font-semibold">13 km/h</p>
          </div>
        </div>
      </motion.div>

      {/* Budget Card */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="absolute -right-12 top-24 hidden w-60 rounded-2xl border border-white/40 bg-white/90 p-5 shadow-2xl backdrop-blur-xl lg:block"
      >
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-semibold">
            Budget Status
          </h4>

          <Wallet className="h-6 w-6 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-green-600">
          ₹38,500 Left
        </h2>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-green-500 to-emerald-400"></div>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          65% Budget Remaining
        </p>
      </motion.div>

      {/* Packing Card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4.5,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-8 hidden w-72 rounded-2xl border border-white/40 bg-white/90 p-5 shadow-2xl backdrop-blur-xl lg:block"
      >
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-semibold">
            Smart Packing
          </h4>

          <Backpack className="h-6 w-6 text-blue-600" />
        </div>

        <div className="space-y-3 text-sm">

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Passport
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Charger
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Sunscreen
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Rain Jacket
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Camera
          </div>

        </div>
      </motion.div>
    </>
  );
}