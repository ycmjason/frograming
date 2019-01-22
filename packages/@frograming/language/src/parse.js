import pegParser from './parser.peg';

export default frogCode => {
  const ast = pegParser.parse(frogCode);
  return ast;
};
