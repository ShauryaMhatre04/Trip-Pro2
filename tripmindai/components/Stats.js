"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Plane,
  Globe2,
  Star,
  Wallet,
} from "lucide-react";

const stats = [
  {
    icon: Plane,
    value: 15000,
    suffix: "+",
    label: "Trips Planned",
    color: "text-amber-500",
  },
  {
    icon: Globe2,
    value: 60,
    suffix: "+",
    label: "Countries",
    color: "text-blue-500",
  },
  {
    icon: Star,
    value: 4.9,
    decimals: 1,
    label: "User Rating",
    color: "text-yellow-500",
  },
  {
    icon: Wallet,
    value: 98,
    suffix: "%",
    label: "Budget Accuracy",
    color: "text-green-500",
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition"
              >

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">

                  <Icon className={`h-7 w-7 ${item.color}`} />

                </div>

                <h2 className="text-4xl font-bold text-slate-900">

                  <CountUp
                    end={item.value}
                    duration={2}
                    decimals={item.decimals || 0}
                  />

                  {item.suffix}

                </h2>

                <p className="mt-3 text-gray-500">

                  {item.label}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}