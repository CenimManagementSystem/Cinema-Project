import { describe, it, expect } from 'vitest';
import { formatDate, formatDuration, formatCurrency } from '@/utils/formatDate';

describe('Format Utilities', () => {
  it('formats duration correctly', () => {
    expect(formatDuration(120)).toBe('2h 0m');
    expect(formatDuration(176)).toBe('2h 56m');
    expect(formatDuration(45)).toBe('45m');
  });

  it('formats currency correctly', () => {
    expect(formatCurrency(15)).toContain('15.00');
  });

  it('formats date string correctly', () => {
    const formatted = formatDate('2026-08-21');
    expect(formatted).toContain('2026');
  });
});
