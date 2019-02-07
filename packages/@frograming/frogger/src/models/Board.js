import 'core-js/fn/array/flat-map';
import { isInRange } from '../utils/math';
import { Car, Log } from './Obstacles';

export const MAX_X = 12;
export const MAX_Y = 14;

const isObstacleUp = ({ pos, length }, frogPos) => {
  return pos.y === frogPos.y - 1 && isInRange(frogPos.x, [pos.x - 1, pos.x + length], '()');
};

const isObstacleDown = ({ pos, length }, frogPos) => {
  return pos.y === frogPos.y + 1 && isInRange(frogPos.x, [pos.x - 1, pos.x + length], '()');
};

const isObstacleLeft = ({ pos, length, velocity }, frogPos) => {
  return pos.y === frogPos.y
    && isInRange(
      frogPos.x,
      velocity > 0
        ? [pos.x + length, pos.x + length + velocity]
        : [pos.x + length + velocity, pos.x + length],
    );
};

const isObstacleRight = ({ pos, velocity }, frogPos) => {
  return pos.y === frogPos.y
    && isInRange(
      frogPos.x + 1,
      velocity > 0
        ? [pos.x, pos.x + velocity]
        : [pos.x + velocity, pos.x],
    );
};

export default class Board {
  constructor({ obstacles, frogPos }) {
    this.obstacles = obstacles;
    this.frogPos = frogPos;
  }

  isCarUpOfFrog () {
    const { obstacles, frogPos } = this;
    const cars = obstacles.filter(({ type }) => type === 'car');
    return cars.some(car => isObstacleUp(car, frogPos));
  }

  isCarDownOfFrog () {
    const { obstacles, frogPos } = this;
    const cars = obstacles.filter(({ type }) => type === 'car');
    return cars.some(car => isObstacleDown(car, frogPos));
  }

  isCarLeftOfFrog () {
    const { obstacles, frogPos } = this;
    const cars = obstacles.filter(({ type }) => type === 'car');
    return cars.some(car => isObstacleLeft(car, frogPos));
  }

  isCarRightOfFrog () {
    const { obstacles, frogPos } = this;
    const cars = obstacles.filter(({ type }) => type === 'car');
    return cars.some(car => isObstacleRight(car, frogPos));
  }

  isLogUpOfFrog () {
    const { obstacles, frogPos } = this;
    const logs = obstacles.filter(({ type }) => type === 'log');
    return logs.some(log => isObstacleUp(log, frogPos));
  }

  isLogDownOfFrog () {
    const { obstacles, frogPos } = this;
    const logs = obstacles.filter(({ type }) => type === 'log');
    return logs.some(log => isObstacleDown(log, frogPos));
  }

  isLogLeftOfFrog () {
    const { obstacles, frogPos } = this;
    const logs = obstacles.filter(({ type }) => type === 'log');
    return logs.some(log => isObstacleLeft(log, frogPos));
  }

  isLogRightOfFrog () {
    const { obstacles, frogPos } = this;
    const logs = obstacles.filter(({ type }) => type === 'log');
    return logs.some(log => isObstacleRight(log, frogPos));
  }

  isWallUpOfFrog () {
    return this.frogPos.y === 0;
  }

  isWallDownOfFrog () {
    return this.frogPos.y === MAX_Y;
  }

  isWallLeftOfFrog () {
    return this.frogPos.x === 0;
  }

  isWallRightOfFrog () {
    return this.frogPos.x === MAX_X;
  }
}

export const getInitialBoard = () => new Board({
  obstacles: [
    ...[1, 6, 11].map(x => new Log({
      pos: { x, y: 2 },
      length: 3,
      velocity: 0.7,
    })),

    ...[0, 6, 12].map(x => new Log({
      pos: { x, y: 3 },
      length: 2,
      velocity: -1,
    })),

    ...[0, 10].map(x => new Log({
      pos: { x, y: 4 },
      length: 6,
      velocity: 1.2,
    })),

    ...[2, 7, 12].map(x => new Log({
      pos: { x, y: 5 },
      length: 2,
      velocity: 0.4,
    })),

    ...[2, 10].map(x => new Log({
      pos: { x, y: 6 },
      length: 3,
      velocity: -1,
    })),

    ...[0, 4, 8, 12].map(x => new Car({
      pos: { x, y: 8 },
      length: 2,
      velocity: -0.25,
      color: 'white',
    })),

    new Car({ pos: { x: 0, y: 9 }, length: 1, velocity: -0.4, color: 'yellow' }),

    ...[5, 11].map(x => new Car({
      pos: { x, y: 10 },
      length: 1,
      velocity: 0.5,
      color: 'lightyellow',
    })),

    ...[9, 12].map(x => new Car({
      pos: { x, y: 11 },
      length: 1,
      velocity: -0.5,
      color: 'yellow',
    })),

    new Car({ pos: { x: 7, y: 12 }, length: 1, velocity: -0.25, color: 'pink' }),

    ...[0, 4, 8, 12].map(x => new Car({
      pos: { x, y: 13 },
      length: 1,
      velocity: 0.5,
      color: 'red',
    })),
  ],

  frogPos: {
    x: MAX_X / 2,
    y: MAX_Y,
  },
});
