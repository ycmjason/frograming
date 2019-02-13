module.exports = [
  [
    ['moveRight', { isCarUp: true }],
    ['NO_OP', { isCarUp: false }],
    ['moveRight', { isLogUp: true, isWallRight: true }],
    ['NO_OP', { isLogUp: false }],
  ],
];
