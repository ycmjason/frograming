module.exports = [
  [
    ['moveDown', { 'isCarLeft':true }],
    ['moveUp', {}],

    ['moveDown', {}],
    ['moveDown', {}],

    ['NO_OP', {}],
    ['moveDown', {}],

    ['moveLeft', {}],
    ['moveUp', {}],
    ['NO_OP', {}],
    ['moveLeft', {}],

    ['moveLeft', {}],
    ['moveUp', {}],
    ['NO_OP', {}],
    ['moveLeft', {}],

    ['TERMINATED', {}],
  ],
  [
    ['moveDown', { 'isCarUp':true, 'isLogUp':true }],
    ['moveUp', {}],

    ['moveDown', {}],
    ['moveDown', {}],

    ['NO_OP', {}],
    ['moveUp', {}],

    ['TERMINATED', {}],
  ],
];
