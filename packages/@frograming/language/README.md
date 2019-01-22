# `@frograming/language`

> This repo defines the language `.frog`.

## Install

```
npm install @frograming/language
```

## Introduction

Frogram is a simple programing language that compiles to "frogger command".

A frogger command is a `String` of this format: `Move(Up|Right|Down|Left) | NO_OP | TERMINATED`.

This package exposes two methods: `parse` and `interpret`.

- `parse` takes in a frogram code, returning the abstract syntax tree (AST) of the code.
- `interpret` takes in the AST, returning an `execuation` object.

The `execution` object is a simple object representing the execution context:

- `execution.terminated`
    - Type: <`Boolean`>
    - Description: Represents if the frogram has completed
- `execution.step(state)`
    - Type: <`Function`>
    - Arguments:
      - `state`: <`Object`>, an object representing the frogger state
          - A frogger state is an object with `is(Log|Car|Wall)(Up|Right|Down|Left)` keys and boolean values.
          - e.g. `{ isLogUp: false, isCarDown: true ... }`
      - returns: <`String`>, a frogger command: `Move(Up|Right|Down|Left) | NO_OP | TERMINATED`.
    - Use the given state to continue/step the program until a command is emitted.

## Language Introduction

WIP

## Usage

```js
import { parse, interpret } '@frograming/language';

const ast = parse(`moveDown();
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

const execuation = interpret(ast);

execuation.step({
  isCarUp: false,
  isCarLeft: true
  ...
}); // move(Up|Right|Down|Left) | NO_OP | TERMINATED

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
