import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';

import './globals.css';



const fraunces = Fraunces({

  subsets: ['latin'],

  variable: '--font-fraunces',

  weight: ['500', '600', '700'],

});



const inter = Inter({

  subsets: ['latin'],

  variable: '--font-inter',

});



const plexMono = IBM_Plex_Mono({

  subsets: ['latin'],

  variable: '--font-mono',

  weight: ['400', '500', '600'],

});



export const metadata = {

  title: 'TripMindAI — Plan smarter trips, under budget',

  description:

    'TripMindAI uses AI to build day-by-day travel itineraries that fit your budget, track your spending, and keep every trip on course.',

};



export default function RootLayout({ children }) {

  return (

    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>

      <body className="font-body bg-paper text-ink antialiased">{children}</body>

    </html>

  );

} 

