// This language is defined with the PEG.js grammar
{
  const notElim = (nots) => Array.from({ length: nots.length % 2 }, () => '!').join('');
}

Frogram = "onTick" _ "{" _ body:Lines _ "}" _ { return { type: 'frogram', body }; }

Lines
  = ls:(_ l:Line _ { return l })* { return ls; }

Line
  = operation:ExecCommand ";" { return operation; }
  / operations:IfStatement { return operations; }

ExecCommand
  = "exec" _ name:CommandName { return { type: 'command', name }; }

CommandName = "moveUp" / "moveDown" / "moveLeft" / "moveRight"
  
IfStatement
  = "if" _ "(" _ p:Predicate _ ")" _ "{" _ ifBody:Lines _ "}" _ elseBody:ElseStatement? {
    elseBody = elseBody || [];
    return { type: 'IfStatement', condition: p, ifBody, elseBody };
  }

ElseStatement
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
PredicateName = "isGoalUp" / "isRiverUp" / "is" ("Car"/"Log"/"Wall") ("Up"/"Right"/"Down"/"Left") { return text() }

_ "whitespace" = [ \t\n\r]*
Integer "integer" = _ [0-9]+ { return parseInt(text(), 10); }
Boolean "boolean" = _ ("true" / "false") { return text(); }
