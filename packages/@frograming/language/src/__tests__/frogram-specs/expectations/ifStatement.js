module.exports = [
  [
    ['moveLeft', {}],
    ['NO_OP', { 'isLogDown': true }],
    ['moveRight', {}],
    ['NO_OP', { 'isCarUp': true }],
    ['moveDown', {}],
    ['moveRight', {}],
    ['TERMINATED', {}],
  ],
  [
    ['moveLeft', {}],
    ['NO_OP', {}],
    ['moveUp', {}],
    ['NO_OP', {}],
    ['moveRight', {}],
    ['TERMINATED', {}],
  ],
]
