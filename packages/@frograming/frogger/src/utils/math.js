export const mod = (x, y) => ((x % y) + y) % y;

export const isInRange = (n, [l, h], rangeOperator='[]') => {
  switch (rangeOperator) {
    case '[]': return l <= n && n <= h;
    case '()': return l < n && n < h;
    case '(]': return l < n && n <= h;
    case '[)': return l <= n && n < h;
    default: throw Error(`Invalid range operator ${rangeOperator}.`);
  }
};

export { default as round } from 'lodash.round';
