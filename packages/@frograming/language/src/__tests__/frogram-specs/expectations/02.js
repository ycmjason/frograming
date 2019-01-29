module.exports = [
  [
    ['moveDown', {}],
    ['moveUp', {}],

    ['NO_OP', {}],
    ['moveUp', {}],

    ['NO_OP', {}],
    ['moveUp', {}],

    ['NO_OP', { 'isLogUp': true }],
    ['moveLeft', {}],

    ['NO_OP', { 'isLogUp': false }],
    ['NO_OP', { 'isLogUp': false }],
    ['NO_OP', { 'isLogUp': false }],

    ['NO_OP', { 'isLogUp': true, 'isLogLeft': true }],
    ['NO_OP', {}],
    ['TERMINATED', {}],
  ],

  [
    ['moveDown', {}],
    ['moveUp', {}],

    ['NO_OP', {}],
    ['moveUp', {}],
    ['NO_OP', { 'isLogUp': true }],
    ['moveLeft', {}],
    ['NO_OP', { 'isLogUp': false }],
    ['moveUp', {}],

    ['NO_OP', {}],
    ['NO_OP', {}],
    ['NO_OP', {}],
    ['NO_OP', {}],
    ['NO_OP', {}],
    ['NO_OP', { 'isLogUp': true }],

    ['NO_OP', { 'isLogLeft': false }],
    ['moveUp', {}],
    ['NO_OP', {}],
    ['moveUp', {}],
    ['NO_OP', {}],
    ['moveUp', {}],
    ['NO_OP', {}],
    ['moveUp', {}],
    ['NO_OP', { 'isLogLeft': true }],
    ['TERMINATED', {}],
  ],
];
