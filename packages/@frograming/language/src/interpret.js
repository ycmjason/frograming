import evaluatePredicate from './evaluatePredicate.js';

const MAX_STEP_COUNT = 9999;

function* interpret(node) {
  if (typeof node !== 'object') {
    throw TypeError(`Expecting node to be an object. ${typeof node} is found instead.`);
  }

  const type = Array.isArray(node) ? 'lines' : node.type;

  if (typeof interpret[type] !== 'function') {
    throw Error(`Unknown node type, ${node.type}, in abstract syntax tree.`);
  }

  yield* interpret[type](node);
}

interpret.lines = function* (nodes) {
  for (const node of nodes) {
    yield* interpret(node);
  }
};

interpret.frogram = function* ({ body }) {
  yield* interpret(body);
};

interpret.command = function* ({ name }) {
  yield name;
};

interpret.IfStatement = function* ({ condition, ifBody, elseBody }) {
  const state = yield;
  const body = evaluatePredicate(condition, state) ? ifBody: elseBody;
  yield* interpret(body);
};

interpret.LoopStatement = function* ({ n, body }) {
  for (let i = 0; i < n; i++) {
    yield* interpret(body);
  }
};

interpret.WhileStatement = function* ({ condition, body }) {
  while (evaluatePredicate(condition, yield)) {
    yield* interpret(body);
  }
};

interpret.WaitStatement = function* ({ condition }) {
  let state = yield;
  while (!evaluatePredicate(condition, state)) {
    state = yield 'NO_OP';
  }
};

export default (ast) => {
  const commandGenerator = interpret(ast);

  let stepCount = 0;

  const execution = {
    terminated: false,
    step: (state) => {
      if (execution.terminated) return 'TERMINATED';
      if (stepCount++ > MAX_STEP_COUNT) {
        throw Error(`MAX_STEP_COUNT exceeded: Are you waiting on a predicate that never came true?`);
      }

      let next;
      do {
        next = commandGenerator.next(state);
      } while (!next.value && !next.done);

      if (next.done) execution.terminated = true;
      return next.value || 'TERMINATED';
    },
  };

  return execution;
};
