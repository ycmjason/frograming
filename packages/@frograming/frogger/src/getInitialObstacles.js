import Car from './svg-components/Car.vue';

const getInitialCars = ({ MAX_X, MAX_Y }) => [
  // first row
  { pos: { x: 0, y: MAX_Y - 1 }, length: 1 },
  { pos: { x: 4, y: MAX_Y - 1 }, length: 1 },
  { pos: { x: 8, y: MAX_Y - 1 }, length: 1 },
  { pos: { x: 12, y: MAX_Y - 1 }, length: 1 },
  // second row
  { pos: { x: 1, y: MAX_Y - 2 }, length: 1 },
  { pos: { x: 4, y: MAX_Y - 2 }, length: 1 },
  { pos: { x: 9, y: MAX_Y - 2 }, length: 1 },
  { pos: { x: 12, y: MAX_Y - 2 }, length: 1 },
].map(obj => ({ ...obj, is: Car }));

export default ({ MAX_X, MAX_Y }) => [
  ...getInitialCars({ MAX_X, MAX_Y }),
];
