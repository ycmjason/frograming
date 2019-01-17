// This language is defined with the PEG.js grammar
{
  const repeat = function* (x) { while (true) yield x; };
  const take = (length, itr) => Array.from({ length }, () => itr.next().value);
  const notElim = (nots) => Array.from({ length: nots.length % 2 }, () => '!').join('');
  const flatten = xs => [].concat.apply([], xs);
}


Lines // => [operation]
  = ls:(_ l:Line _ { return l })* { return flatten(ls); }

Line // => [operation]
  = operation:MethodCall ";" { return [operation]; }
  / operations:Statement { return operations; }

MethodCall // => operation
  = _ name:MethodName _ "()" { return name; }

MethodName = "moveUp" / "moveDown" / "moveLeft" / "moveRight"

Statement // => [operation]
  = LoopStatement / IfStatement

LoopStatement // => [operation]
  = "loop" _ "(" _ n:Integer _ ")" _ "{" _ operations:Lines _ "}" {
    return flatten(take(n, repeat(operations)));
  }
  
IfStatement // => [operation]
  = "if" _ "(" _ p:Predicate _ ")" _ "{" _ operations:Lines _ "}" _ e:ElseStatement? {
    if (p === "true") return operations;
    if (p === "false") return e || [];
    const branch = {};
    branch[p] = operations;
    if (e) branch.else = e;
    if (operations.length <= 0 && !e) return [];
    return branch;
  }

ElseStatement // => [operation]
  = "else" _ "{" _ operations:Lines _ "}" {
    if (operations.length <= 0) return null;
    return operations;
  }

Predicate = p:_PREDICATE ps:(l:_LOGICAL_OPERATOR p2:Predicate { return l + p2; })* { return p + ps.join('') }
          / "(" p:Predicate ")" { return '(' + p + ')' }
_PREDICATE = nots:"!"* _ p:(
                 name:PredicateName _ "()" { return name; }
               / bool:Boolean { return bool }
             ) {
               const q = notElim(nots) + p;
               if (['true', '!false'].includes(q)) return 'true';
               if (['false', '!true'].includes(q)) return 'false';
               return q;
             }
_LOGICAL_OPERATOR = _ o:("&&" / "||") _ { return o }
PredicateName = "is" ("Car"/"Log"/"Wall") ("Up"/"Right"/"Down"/"Left") { return text() }

_ "whitespace" = [ \t\n\r]*
Integer "integer" = _ [0-9]+ { return parseInt(text(), 10); }
Boolean "boolean" = _ ("true" / "false") { return text(); }
