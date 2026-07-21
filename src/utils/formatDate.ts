/** Pure helper — no React or API dependencies, safe to unit test alone. */
export function formatDate(input: string | Date, locale = 'en-US'): string {
  const date = typeof input === 'string' ? new Date(input) : input
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
