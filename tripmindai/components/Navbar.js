"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Weather", href: "#weather" },
    { label: "Packing", href: "#packing" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/70 shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-xl"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
            <Plane className="h-5 w-5 rotate-45" />
          </div>

          <div>
            <span className="font-display text-2xl">
              TripMind
              <span className="text-amber-500">AI</span>
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-medium text-gray-700 transition hover:text-amber-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            href="/login"
            variant="outline"
            className="rounded-full"
          >
            Login
          </Button>

          <Button
            href="/signup"
            className="rounded-full bg-amber-500 hover:bg-amber-600 text-white px-6"
          >
            Start Planning
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-white p-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-medium"
              >
                {item.label}
              </Link>
            ))}

            <Button href="/signup">
              Start Planning
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}