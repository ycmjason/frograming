module.exports = [
  [
    ['moveLeft', {}],
    ['NO_OP', {}],
    ['NO_OP', {}],
    ['TERMINATED', {}],
  ],
  [
    ['moveLeft', {}],

    ['NO_OP', {isCarDown: true}],
    ['moveUp', {}],
    ['moveRight', {isCarDown: false}],

    ['NO_OP', {}],

    ['moveDown', {}],
    ['NO_OP', {}],

    ['NO_OP', {}],
    ['TERMINATED', {}],
  ],
  [
    ['moveLeft', {}],

    ['NO_OP', {isCarDown: true}],
    ['moveUp', {}],
    ['moveRight', {}],
    ['NO_OP', {isLogUp: true}],
    ['moveLeft', {}],
    ['NO_OP', {isLogUp: false}],
    ['moveDown', {}],

    ['NO_OP', {}],
    ['moveUp', {}],
    ['moveRight', {}],
    ['NO_OP', {isLogLeft: true}],
    ['moveLeft', {}],
    ['NO_OP', {}],
    ['moveLeft', {}],
    ['NO_OP', {}],
    ['moveLeft', {}],
    ['NO_OP', {}],
    ['moveLeft', {}],
    ['NO_OP', {isLogLeft: false}],

    ['moveDown', {}],
    ['NO_OP', {isCarDown: false}],

    ['NO_OP', {isWallLeft: false}],

    ['TERMINATED', {}],
  ],

  [
    ['moveLeft', {}],
    ['NO_OP', {isCarDown: false}],

    ['NO_OP', {isWallLeft: true}],
    ['NO_OP', {isWallLeft: true}],
    ['NO_OP', {isWallLeft: false}],
    ['TERMINATED', {}],
  ],
];
