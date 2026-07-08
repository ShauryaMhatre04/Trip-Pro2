"use client";

import { useEffect, useMemo, useState } from "react";
import { CloudSun, CloudRain, Droplets, MapPin, RefreshCw, Wind } from "lucide-react";
import { getWeather } from "@/lib/weather";
import { Button } from "@/components/ui/button";

const BALI_COORDS = [-8.65, 115.2167];

function describeWeather(code) {
  if ([0, 1].includes(code)) return "Mostly sunny";
  if ([2, 3, 45, 48].includes(code)) return "Cloudy";
  if (code >= 51 && code <= 82) return "Rain likely";
  if (code >= 95) return "Storms";
  return "Mixed";
}

function formatTemp(value) {
  return Number.isFinite(value) ? `${Math.round(value)}°` : "--";
}

export default function WeatherPreview() {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  async function loadWeather() {
    setStatus("loading");
    setError("");

    try {
      const data = await getWeather(...BALI_COORDS);
      setWeather(data);
      setStatus("ready");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Forecast is temporarily unavailable. Check your connection and try again.");
    }
  }

  useEffect(() => {
    loadWeather();
  }, []);

  const forecast = useMemo(() => {
    const daily = weather?.daily;
    if (!daily?.time?.length) return [];

    return daily.time.slice(0, 7).map((day, index) => ({
      date: day,
      label: new Date(`${day}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      max: daily.temperature_2m_max?.[index],
      min: daily.temperature_2m_min?.[index],
      summary: describeWeather(daily.weather_code?.[index]),
      wet: daily.weather_code?.[index] >= 51,
    }));
  }, [weather]);

  const currentCode = weather?.daily?.weather_code?.[0];

  return (
    <section
      id="weather"
      className="bg-gradient-to-br from-blue-50 via-white to-amber-50 py-24 text-gray-900"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Live Weather
          </span>

          <h2 className="mt-5 font-display text-4xl font-bold">
            Plan According To Weather
          </h2>

          <p className="mt-4 text-gray-500">
            Real-time weather forecast for your destination.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
          <div className="glass rounded-2xl p-8 shadow-premium card-hover">
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={16} />
                  Bali, Indonesia
                </div>

                <h2 className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent">
                  {formatTemp(weather?.current?.temperature_2m)}
                </h2>

                <p className="text-gray-500">
                  {status === "ready"
                    ? describeWeather(currentCode)
                    : status === "error"
                      ? "Weather unavailable"
                      : "Loading weather"}
                </p>
              </div>

              <CloudSun size={90} className="shrink-0 text-yellow-400 float" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="rounded-xl bg-white/75 p-4">
                <Wind className="mb-2 text-blue-500" />
                <h3 className="font-semibold">Wind</h3>
                <p>{weather?.current?.wind_speed_10m ?? "--"} km/h</p>
              </div>

              <div className="rounded-xl bg-white/75 p-4">
                <Droplets className="mb-2 text-cyan-500" />
                <h3 className="font-semibold">Humidity</h3>
                <p>{weather?.current?.relative_humidity_2m ?? "--"}%</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 shadow-premium card-hover">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold">7 Day Forecast</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:border-gray-500"
                onClick={loadWeather}
                disabled={status === "loading"}
              >
                <RefreshCw className={`h-4 w-4 ${status === "loading" ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {status === "error" && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                {error}
              </div>
            )}

            {status === "loading" && (
              <div className="space-y-3">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="h-16 animate-pulse rounded-xl bg-white/70" />
                ))}
              </div>
            )}

            {status === "ready" && (
              <div className="space-y-3">
                {forecast.map((day) => {
                  const Icon = day.wet ? CloudRain : CloudSun;

                  return (
                    <div
                      key={day.date}
                      className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 rounded-xl bg-white/75 p-4 text-sm"
                    >
                      <span className="font-semibold">{day.label}</span>
                      <div className="flex min-w-0 items-center gap-3 text-gray-500">
                        <Icon className="h-5 w-5 shrink-0 text-yellow-500" />
                        <span className="truncate">{day.summary}</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {formatTemp(day.max)} / {formatTemp(day.min)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
