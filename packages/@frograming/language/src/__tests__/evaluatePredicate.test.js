import evaluate from '../evaluatePredicate.js';
describe('evaluatePredicate', () => {
  it('should deal with negation', () => {
    expect(evaluate('!true', {})).toBe(false);
    expect(evaluate('!true', {})).toBe(false);
  });

  it('should evaluate boolean literals', () => {
    expect(evaluate('true', {})).toBe(true);
    expect(evaluate('false', {})).toBe(false);
  });

  it('should evalute simple predicate to boolean', () => {
    expect(evaluate('apple', { apple: true })).toBe(true);
  });

  it('should evalute && predicate to boolean', () => {
    expect(evaluate('a&&b', { a: true, b: false })).toBe(false);
  });

  it('should evalute || predicate to boolean', () => {
    expect(evaluate('a||b', { a: true, b: false })).toBe(true);
  });

  it('should evalute chained predicate to boolean', () => {
    expect(evaluate('a||b&&c', { a: true, b: false, c: true })).toBe(true);
    expect(evaluate('a||b&&c', { a: true, b: false, c: false })).toBe(true);
    expect(evaluate('a||b&&c', { a: false, b: true, c: true })).toBe(true);
  });

  it('should deal with brackets', () => {
    expect(evaluate('(a||b)&&(c||d)', { a: true, b: false, c: false, d: false })).toBe(false);
  });

  it('should deal with complicated brackets', () => {
    expect(evaluate('(a&&(b||c&&(d||e&&false)))', {
      a: true,
      b: false,
      c: true,
      d: true,
      e: false,
    })).toBe(true);

    expect(evaluate('(a&&(b||c&&(d||e)&&false))', {
      a: true,
      b: false,
      c: true,
      d: true,
      e: false,
    })).toBe(false);
  });
});
