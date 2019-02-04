import evaluatePredicate from './evaluatePredicate.js';

function* interpret(node) {
  if (!node) return 'TERMINATED'
  if (typeof node !== 'object') {
    throw TypeError(`Expecting node to be an object. ${typeof node} is found instead.`);
  }

  const type = Array.isArray(node) ? 'lines' : node.type;

  if (typeof interpret[type] !== 'function') {
    throw Error(`Unknown node type, ${node.type}, in abstract syntax tree.`);
  }

  yield* interpret[type](node);

  return 'TERMINATED';
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
  const body = evaluatePredicate(condition, yield 'NO_OP') ? ifBody: elseBody;
  yield* interpret(body);
};

interpret.LoopStatement = function* ({ n, body }) {
  for (let i = 0; i < n; i++) {
    yield* interpret(body);
  }
};

interpret.WhileStatement = function* ({ condition, body }) {
  while (evaluatePredicate(condition, yield 'NO_OP')) {
    yield* interpret(body);
  }
};

interpret.WaitStatement = function* ({ condition }) {
  while (!evaluatePredicate(condition, yield 'NO_OP'));
};

export default (ast) => {
  const commandGenerator = interpret(ast);

  const execution = {
    terminated: false,
    step: (state) => {
      if (execution.terminated) return 'TERMINATED';

      const { value, done } = commandGenerator.next(state);

      if (done) execution.terminated = true;

      return value;
    },
  };

  return execution;
};
