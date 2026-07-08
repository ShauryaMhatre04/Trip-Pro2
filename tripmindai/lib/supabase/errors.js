export function getSupabaseAuthErrorMessage(error) {
  if (!error) {
    return 'Something went wrong. Please try again.';
  }

  if (
    error.name === 'AuthRetryableFetchError' ||
    error.message?.toLowerCase().includes('fetch failed')
  ) {
    return 'Unable to reach the auth service. Check your internet connection and Supabase project URL, then try again.';
  }

  return error.message || 'Something went wrong. Please try again.';
}
