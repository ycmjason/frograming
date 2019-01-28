import 'core-js/fn/array/flat-map';
import { Car } from './Obstacles';

export const MAX_X = 12;
export const MAX_Y = 14;

const getInitialCars = () => [
  {
    xs: [0, 4, 8, 12],
    color: 'red',
    length: 1,
    velocity: 1,
  },
  {
    xs: [12],
    color: 'pink',
    length: 1,
    velocity: -0.5,
    type: Car,
  },
  {
    xs: [9, 12],
    color: 'yellow',
    length: 1,
    velocity: -1,
    type: Car,
  },
  {
    xs: [3],
    color: 'lightyellow',
    length: 1,
    velocity: 1,
  },
  {
    xs: [0],
    color: 'yellow',
    length: 1,
    velocity: -0.8,
  },
  {
    xs: [-1, 3, 7, 11],
    color: 'white',
    length: 2,
    velocity: -0.5,
  },
].flatMap(({ xs, color, length, velocity, type }, i) => xs.map(x => new Car({
  pos: { x, y: MAX_Y - 1 - i },
  length,
  velocity,
  color,
})));

export const getInitialGameBoard = () => ({
  obstacles: [
    ...getInitialCars(),
  ],

  frogPos: {
    x: MAX_X / 2,
    y: MAX_Y,
  },
});
