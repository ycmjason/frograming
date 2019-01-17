# `@frograming/language`

> This repo defines the language `.frog`.

## Install

```
npm install @frograming/language
```

## Usage

```js
import { parse, interpret } '@frograming/language';

const executionTree = parse(`moveDown();
moveUp();

loop(2) {
  moveDown();
}

if (!isCarUp() && isCarLeft() || isLogUp()) {
  moveDown();
  loop (2) {
    moveLeft();
    moveUp();
    if (isCarUp()) {
      moveUp();
    } else {
      moveLeft();
    }
  }
} else {
  moveUp();
}`);

interpret(executionTree, {
  isCarUp: false,
  isCarLeft: true
  ...
});

/*
 * [
 *   "moveDown",
 *   "moveUp",
 *   "moveDown",
 *   "moveDown",
 *   "moveDown",
 *   "moveLeft",
 *   "moveUp",
 *   "moveLeft",
 *   "moveLeft",
 *   "moveUp",
 *   "moveLeft"
 * ]
 */
```

## Author
Jason Yu
