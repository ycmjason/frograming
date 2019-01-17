import pegParser from './parser.peg.js';
import evaluatePredicate from './evaluatePredicate.js';

const flatMap = (xs, fn, thisArg) => {
  if (typeof xs.flatMap === 'function') {
    return xs.flatMap(fn, thisArg);
  }

  const bFn = fn.bind(thisArg);
  return xs.reduce((acc, x) => {
    const r = bFn(x);
    if (Array.isArray(r)) return [...acc, ...r];
    return [...acc, r];
  }, []);
};

const parse = frogCode => {
  const executionTree = pegParser.parse(frogCode);
  return context => interpretTreeWithContext(executionTree, context);
};

const interpretTreeWithContext = (executionTree, context) => flatMap(executionTree, atom => {
  if (typeof atom === 'string') return atom;
  if (typeof atom !== 'object') throw Error('Unexpected error while parsing.');

  for (const [predicate, executionTree] of Object.entries(atom)) {
    if (predicate === 'else' || evaluatePredicate(predicate, context)) {
      return interpretTreeWithContext(executionTree, context);
    }
  }

  return [];
});

export default parse;
