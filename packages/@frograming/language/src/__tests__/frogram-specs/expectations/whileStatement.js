module.exports = [
  [
    ['moveLeft', {}],
    ['TERMINATED', {}],
  ],
  [
    ['moveLeft', {}],
    ['moveUp', {isCarDown: true}],
    ['moveRight', {isCarDown: false}],
    ['moveDown', {}],
    ['TERMINATED', {}],
  ],
  [
    ['moveLeft', {}],

    ['moveUp', {isCarDown: true}],
    ['moveRight', {}],
    ['moveLeft', {isLogUp: true}],
    ['moveDown', {isLogUp: false}],

    ['moveUp', {}],
    ['moveRight', {}],

    ['moveLeft', {isLogLeft: true}],
    ['moveLeft', {}],
    ['moveLeft', {}],
    ['moveLeft', {}],

    ['moveDown', {isLogLeft: false}],

    ['TERMINATED', {isCarDown: false}],
  ],

  [
    ['moveLeft', {}],
    ['NO_OP', {isWallLeft: true}],
    ['NO_OP', {isWallLeft: true}],
    ['TERMINATED', {isWallLeft: false}],
  ],
];
