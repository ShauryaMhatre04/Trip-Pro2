'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/input';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    // Fire the Resend welcome email (best-effort; don't block signup on it).
    try {
      await fetch('/api/email/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName }),
      });
    } catch {
      // Non-fatal — the account was still created.
    }

    setLoading(false);
    setDone(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-display text-xl font-semibold">
          <Compass className="h-5 w-5 text-teal" strokeWidth={2.2} />
          TripMind<span className="text-teal">AI</span>
        </Link>

        <div className="ticket p-7">
          {done ? (
            <div className="text-center">
              <h1 className="font-display text-xl font-semibold">Check your inbox</h1>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                We sent a confirmation link to <span className="font-medium">{email}</span>.
                Confirm your email, then log in to start planning.
              </p>
              <Button href="/login" variant="outline" className="mt-6 w-full">
                Go to login
              </Button>
            </div>
          ) : (
            <>
              <h1 className="font-display text-xl font-semibold">Create your account</h1>
              <p className="mt-1 text-sm text-ink/60">Free while in early access.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Asha Kulkarni"
                  />
                </div>
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
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">{error}</p>
                )}

                <Button type="submit" variant="amber" className="w-full" disabled={loading}>
                  {loading ? 'Creating account…' : 'Create account'} <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>

        {!done && (
          <p className="mt-6 text-center text-sm text-ink/60">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-teal-dark hover:underline">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
