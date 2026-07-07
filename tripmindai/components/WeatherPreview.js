"use client";

import { useEffect, useState } from "react";
import { CloudSun, Wind, Droplets, MapPin } from "lucide-react";
import { getWeather } from "@/lib/weather";

export default function WeatherPreview() {
    const [weather, setWeather] = useState(null);

useEffect(() => {
  async function loadWeather() {
    try {
      const data = await getWeather(-8.65, 115.2167);
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  }

  loadWeather();
}, []);
  return (
    <section
      id="weather"
      className="py-24 bg-gradient-to-br from-blue-50 via-white to-amber-50"
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

        <div className="grid gap-8 md:grid-cols-2">

          {/* Current Weather */}
          <div className="glass rounded-3xl p-8 shadow-premium card-hover">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-2 text-gray-500">

                  <MapPin size={16} />

                  Bali, Indonesia

                </div>

                <h2 className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent">
  {weather?.current?.temperature_2m ?? "--"}°
</h2>

                <p className="text-gray-500">
                  Mostly Sunny
                </p>

              </div>

             <CloudSun
              size={90}
            className="text-yellow-400 float"
             />

            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">

              <div className="rounded-2xl bg-gray-100 p-4">

                <Wind className="mb-2 text-blue-500"/>

                <h3 className="font-semibold">

                  Wind

                </h3>

               <p>
  {weather?.current?.wind_speed_10m ?? "--"} km/h
</p>

              </div>

              <div className="rounded-2xl bg-gray-100 p-4">

                <Droplets className="mb-2 text-cyan-500"/>

                <h3 className="font-semibold">

                  Humidity

                </h3>

               <p>
  {weather?.current?.relative_humidity_2m ?? "--"}%
              </p>

              </div>

            </div>

          </div>

          {/* Forecast */}
            <div className="glass rounded-3xl p-8 shadow-premium card-hover">


            <h3 className="mb-8 text-2xl font-bold">

              7 Day Forecast

            </h3>

          {weather?.daily?.time?.map((day, index) => (
  <div
    key={day}
    className="mb-3 flex items-center justify-between rounded-xl bg-gray-50 p-4"
  >
    <span>
      {new Date(day).toLocaleDateString("en-US", {
        weekday: "short",
      })}
    </span>

    <CloudSun className="h-5 w-5 text-yellow-500" />

    <span className="font-semibold">
      {weather.daily.temperature_2m_max[index]}°
    </span>
  </div>
))}

          </div>

        </div>

      </div>
    </section>
  );
}