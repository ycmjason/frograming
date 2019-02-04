import 'core-js/fn/array/flat-map';
import { isInRange } from '../utils/math';
import { Car, Log } from './Obstacles';

export const MAX_X = 12;
export const MAX_Y = 14;

const isObstacleUp = ({ pos, length }, frogPos) => {
  return pos.y === frogPos.y - 1 && isInRange(frogPos.x, [pos.x - 1, pos.x + length]);
};

const isObstacleDown = ({ pos, length }, frogPos) => {
  return pos.y === frogPos.y + 1 && isInRange(frogPos.x, [pos.x - 1, pos.x + length]);
};

const isObstacleLeft = ({ pos, length }, frogPos) => {
  return pos.y === frogPos.y && isInRange(frogPos.x - 1, [pos.x, pos.x + length]);
};

const isObstacleRight = ({ pos, length }, frogPos) => {
  return pos.y === frogPos.y && isInRange(frogPos.x + 1, [pos.x, pos.x + length]);
};

export default class Board {
  constructor({ obstacles, frogPos }) {
    this.obstacles = obstacles;
    this.frogPos = frogPos;
  }

  isCarUpOfFrog () {
    const { obstacles, frogPos } = this;
    const cars = obstacles.filter(obstacle => obstacle instanceof Car);
    return cars.some(car => isObstacleUp(car, frogPos));
  }

  isCarDownOfFrog () {
    const { obstacles, frogPos } = this;
    const cars = obstacles.filter(obstacle => obstacle instanceof Car);
    return cars.some(car => isObstacleDown(car, frogPos));
  }

  isCarLeftOfFrog () {
    const { obstacles, frogPos } = this;
    const cars = obstacles.filter(obstacle => obstacle instanceof Car);
    return cars.some(car => isObstacleLeft(car, frogPos));
  }

  isCarRightOfFrog () {
    const { obstacles, frogPos } = this;
    const cars = obstacles.filter(obstacle => obstacle instanceof Car);
    return cars.some(car => isObstacleRight(car, frogPos));
  }

  isLogUpOfFrog () {
    const { obstacles, frogPos } = this;
    const logs = obstacles.filter(obstacle => obstacle instanceof Log);
    return logs.some(log => isObstacleUp(log, frogPos));
  }

  isLogDownOfFrog () {
    const { obstacles, frogPos } = this;
    const logs = obstacles.filter(obstacle => obstacle instanceof Log);
    return logs.some(log => isObstacleDown(log, frogPos));
  }

  isLogLeftOfFrog () {
    const { obstacles, frogPos } = this;
    const logs = obstacles.filter(obstacle => obstacle instanceof Log);
    return logs.some(log => isObstacleLeft(log, frogPos));
  }

  isLogRightOfFrog () {
    const { obstacles, frogPos } = this;
    const logs = obstacles.filter(obstacle => obstacle instanceof Log);
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
    ...[0, 4, 8, 12].map(x => new Car({
      pos: { x, y: 13 },
      length: 1,
      velocity: 0.5,
      color: 'red',
    })),

    new Car({ pos: { x: 7, y: 12 }, length: 1, velocity: -0.25, color: 'pink' }),

    ...[9, 12].map(x => new Car({
      pos: { x, y: 11 },
      length: 1,
      velocity: -0.5,
      color: 'yellow',
    })),

    new Car({ pos: { x: 3, y: 10 }, length: 1, velocity: 0.5, color: 'lightyellow' }),

    new Car({ pos: { x: 0, y: 9 }, length: 1, velocity: -0.4, color: 'yellow' }),

    ...[-1, 3, 7, 11].map(x => new Car({
      pos: { x, y: 8 },
      length: 2,
      velocity: -0.25,
      color: 'white',
    })),
  ],

  frogPos: {
    x: MAX_X / 2,
    y: MAX_Y,
  },
});