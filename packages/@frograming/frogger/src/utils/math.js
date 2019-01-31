export const mod = (x, y) => ((x % y) + y) % y;

export const isInRange = (n, [l, h]) => l <= n && n <= h;