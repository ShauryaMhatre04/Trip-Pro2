'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    const redirectedFrom = searchParams.get('redirectedFrom') || '/dashboard';
    router.push(redirectedFrom);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-display text-xl font-semibold">
          <Compass className="h-5 w-5 text-teal" strokeWidth={2.2} />
          TripMind<span className="text-teal">AI</span>
        </Link>

        <div className="ticket p-7">
          <h1 className="font-display text-xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-ink/60">Log in to keep your trip on budget.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">{error}</p>
            )}

            <Button type="submit" variant="amber" className="w-full" disabled={loading}>
              {loading ? 'Logging in…' : 'Log in'} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ink/60">
          New to TripMindAI?{' '}
          <Link href="/signup" className="font-semibold text-teal-dark hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
