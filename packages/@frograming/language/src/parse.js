import pegParser from './parser.peg';

const parse = frogCode => pegParser.parse(frogCode);

parse.Lines = lines => pegParser.parse(lines, { startRule: 'Lines' });

export default parse;
