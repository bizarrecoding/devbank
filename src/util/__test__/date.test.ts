import { isAfterAYear, isDate, isFuture } from "../date";

const FIXED_SYSTEM_TIME = '2026-02-20T17:00:00Z'; // Feb 20 2026, 12m GTM-5

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
});

afterEach(() => {
  jest.useRealTimers();
});

describe('Date utilities', () => { 
  it('should return false if the date is invalid', () => {
    expect(isDate('')).toBe(false);
    expect(isDate(null as any)).toBe(false);
    expect(isDate(undefined as any)).toBe(false);
    expect(isDate('invalid date')).toBe(false);
    expect(isDate('2026-13-01')).toBe(false);
    expect(isDate('2026-02-32')).toBe(false);
    expect(isDate('2026-02-20')).toBe(true);
  })

  it('date is in the future', () => {
    const today = new Date(); 
    expect(isFuture(today.toISOString())).toBe(true);
  })
  
  it('date is in the past', () => {
    expect(isFuture(null as any)).toBe(false);
    expect(isFuture("2025-01-01")).toBe(false);
  })
  
  it('date is exactly one year from today', () => {
    // test with null values
    expect(isAfterAYear(null as any, null as any)).toBe(false);

    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    expect(isAfterAYear(today.toISOString(), nextYear.toISOString())).toBe(true);

    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    const nextPlusOneDay = new Date(nextYear.getTime()+ONE_DAY_IN_MS);
    nextPlusOneDay.setDate(nextYear.getDate() + 1);
    expect(isAfterAYear(today.toISOString(), nextPlusOneDay.toISOString())).toBe(false);
  })
})