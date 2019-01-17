import { readFileSync, readdirSync } from 'fs-extra';
import { join, basename } from 'path';
import { parse, interpret } from '../index.js';

const DEFAULT_CONTEXT = {
  isCarUp: false,
  isCarRight: false,
  isCarDown: false,
  isCarLeft: false,
  isLogUp: false,
  isLogRight: false,
  isLogDown: false,
  isLogLeft: false,
  isWallUp: false,
  isWallRight: false,
  isWallDown: false,
  isWallLeft: false,
};

const zip = ([x, ...xs], [y, ...ys]) => {
  if (typeof x === 'undefined' || typeof y === 'undefined') return [];
  return [[x, y], ...zip(xs, ys)];
};

const readdirFullSync = (dir) => readdirSync(dir).map(name => join(dir, name));

const FROGS_DIR = join(__dirname, 'frogram-specs/frogs');
const EXPECTATIONS_DIR = join(__dirname, 'frogram-specs/expectations');

describe('@frograming/language', () => {
  zip(
    readdirFullSync(FROGS_DIR),
    readdirFullSync(EXPECTATIONS_DIR),
  ).forEach(([frogCodePath, expectationsPath]) => {
    describe(basename(frogCodePath), () => {
      const frogCode = readFileSync(frogCodePath, 'utf8');
      require(expectationsPath).forEach(({ context, expectation }, i) => {
        test(`${i + 1}`.padStart(2, 0), () => {
          const executionTree = parse(frogCode);
          expect(interpret(executionTree, {
            ...DEFAULT_CONTEXT,
            ...context,
          })).toEqual(expectation);
        });
      });
    });
  });
});
