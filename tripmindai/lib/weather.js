export async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}