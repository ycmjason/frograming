module.exports = [
  [
    ['NO_OP', { 'isCarUp': true }],
    ['NO_OP', {}],
    ['moveRight', { 'isCarLeft': true }],
    ['moveLeft', { 'isCarLeft': false, 'isCarRight': true }],
    ['moveUp', { 'isCarUp': false }],
    ['moveUp', {}],
  ],
];
