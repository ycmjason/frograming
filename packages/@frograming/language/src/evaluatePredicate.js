const evaluate = (predicate, context) => {
  if (/[()]/.test(predicate)) {
    return evaluate(predicate.replace(/\([^()]+\)/g, (m) => {
      return evaluate(m.substr(1, m.length - 2), context);
    }), context);
  }

  // predicate is flat
  return evaluateFlatBooleanExpression(
    predicate.replace(
      /[^&|!]+/g,
      (match) => {
        if (/^true|false$/.test(match)) return match;
        if (!(match in context)) console.warn(`Cannot find \`${match}\` in context, assuming false.`);
        return String(context[match] || 'false');
      }
    )
  );
};

const evaluateFlatBooleanExpression = (expression, context) => {
  if (/[()]/.test(expression)) throw Error('expression should not have brackets');

  if (expression === 'true') return true;
  if (expression === 'false') return false;
  if (expression === '!true') return false;
  if (expression === '!false') return true;

  const tail = expression.match(/^!?(true|false)(&&|\|\|)(.*)$/)[3];
  if (/^true&&/.test(expression)) return true && evaluateFlatBooleanExpression(tail);
  if (/^true\|\|/.test(expression)) return true || evaluateFlatBooleanExpression(tail);
  if (/^false&&/.test(expression)) return false && evaluateFlatBooleanExpression(tail);
  if (/^false\|\|/.test(expression)) return false || evaluateFlatBooleanExpression(tail);
  if (/^!true&&/.test(expression)) return false && evaluateFlatBooleanExpression(tail);
  if (/^!true\|\|/.test(expression)) return false || evaluateFlatBooleanExpression(tail);
  if (/^!false&&/.test(expression)) return true && evaluateFlatBooleanExpression(tail);
  if (/^!false\|\|/.test(expression)) return true || evaluateFlatBooleanExpression(tail);

  throw Error('Unexpected Error.');
};

module.exports = evaluate;
