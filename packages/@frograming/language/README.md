# `@frograming/language`

> This repo defines the language `.frog`.

## Install

```
npm install @frograming/language
```

## Introduction

Frogram is a simple programing language that compiles to "frogger command".

A frogger command is a `String` of this format: `Move(Up|Right|Down|Left) | NO_OP`.

This package exposes two methods: `parse` and `interpret`.

- `parse` takes in a frogram code, returning the abstract syntax tree (AST) of the code.
- `interpret` takes in the AST, returning an `execuation` object.

The `execution` object is a simple object representing the execution context:

- `execution.commands`
    - Type: <`Array`<`String`>>
    - Description: Commands that are returned from `tick`.
- `execution.tick(state)`
    - Type: <`Function`>
    - Arguments:
      - `state`: <`Object`>, an object representing the frogger state
          - A frogger state is an object with `isGoalUp|isRiverUp|is(Log|Car|Wall)(Up|Right|Down|Left)` keys and boolean values.
          - e.g. `{ isLogUp: false, isCarDown: true ... }`
      - returns: <`String`>, a frogger command: `Move(Up|Right|Down|Left) | NO_OP`.
    - Description: Use the given state to run the frogCode the program until an `exec` statement.

## Language Introduction

WIP

## Usage

```js
import { parse, interpret } '@frograming/language';

const ast = parse(`onTick {
  if (isGoalUp()) {
    exec moveUp;
  }
  if (!isCarUp()) {
    exec moveUp;
  } else {
    if (isCarLeft()) {
      exec moveRight;
    }
    if (isCarRight()) {
      exec moveLeft;
      exec moveRight;
    }
  }
}`);

const execuation = interpret(ast);

const command = execuation.tick({
  isGoalUp: true,
  isCarUp: false,
  isCarLeft: true
  ...
});

// command === 'moveUp';
```

## Author
Jason Yu
