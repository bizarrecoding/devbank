import { betweenLength } from "../strings";

describe('String utilities', () => { 
  it('should return false if the string falsy', () => {
    expect(betweenLength('', 1, 5)).toBe(false);
    expect(betweenLength(null as any, 1, 5)).toBe(false);
    expect(betweenLength(undefined as any, 1, 5)).toBe(false);
  });

  it('should return true if the string is between the min and max length', () => {
    expect(betweenLength('test', 1, 5)).toBe(true);
  })

  it('should return false if the string is shorter than the min length', () => {
    expect(betweenLength('hi', 3, 5)).toBe(false);
  });

  it('should return false if the string is longer than the max length', () => {
    expect(betweenLength('very long string', 1, 5)).toBe(false);
  });
})