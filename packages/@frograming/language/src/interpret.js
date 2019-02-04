import evaluatePredicate from './evaluatePredicate.js';

const interpret = (node, state) => {
  if (typeof node !== 'object') {
    throw TypeError(`Expecting node to be an object. ${typeof node} is found instead.`);
  }

  const { type } = node;

  if (typeof interpret[type] !== 'function') {
    throw Error(`Unknown node type, ${node.type}, in abstract syntax tree.`);
  }

  return interpret[type](node, state);
};

interpret.frogram = ({ body }, state) => {
  return interpret.lines(body, state);
};

interpret.lines = (nodes, state) => {
  for (const node of nodes) {
    const command = interpret(node, state);
    if (command !== 'NO_OP') {
      return command;
    }
  }

  return 'NO_OP';
};

interpret.command = ({ name }) => name;

interpret.IfStatement = ({ condition, ifBody, elseBody }, state) => {
  const body = evaluatePredicate(condition, state) ? ifBody: elseBody;
  return interpret.lines(body, state);
};

export default (ast) => ({
  commands: [],
  tick (state) {
    const command = interpret(ast, state);
    this.commands.push(command);
    return command;
  },
});
