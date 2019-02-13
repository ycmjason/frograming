import 'core-js/fn/array/flat-map';
import { isInRange } from '../utils/math';
import Frog from './Frog';
import { Car, Log } from './Obstacles';

export const MAX_X = 12;
export const MAX_Y = 14;

export default class Board {
  constructor ({ obstacles, frog }) {
    this.obstacles = obstacles;
    this.frog = frog;
  }

  get cars () {
    return this.obstacles.filter(({ type }) => type === 'car');
  }

  get logs () {
    return this.obstacles.filter(({ type }) => type === 'log');
  }

  tick () {
    const { obstacles, frog } = this;
    for (const obstacle of obstacles) {
      if (obstacle.contains(frog.pos)) {
        frog.moveRight(obstacle.velocity, { skipRotate: true });
      }
      obstacle.move();
    }
  }

  isCarUpOfFrog () {
    const { cars, frog } = this;
    return cars.some(car => car.overlapsWith({
      x: frog.pos.x,
      y: frog.pos.y - 1,
    }));
  }

  isCarDownOfFrog () {
    const { cars, frog } = this;
    return cars.some(car => car.overlapsWith({
      x: frog.pos.x,
      y: frog.pos.y + 1,
    }));
  }

  isCarLeftOfFrog () {
    const { cars, frog } = this;
    return cars.some(car => car.overlapsWith({
      x: frog.pos.x - 1,
      y: frog.pos.y,
    }));
  }

  isCarRightOfFrog () {
    const { cars, frog } = this;
    return cars.some(car => car.overlapsWith({
      x: frog.pos.x + 1,
      y: frog.pos.y,
    }));
  }

  isLogUpOfFrog () {
    const { logs, frog } = this;
    return logs.some(log => log.contains({
      x: frog.pos.x,
      y: frog.pos.y - 1,
    }));
  }

  isLogDownOfFrog () {
    const { logs, frog } = this;
    return logs.some(log => log.contains({
      x: frog.pos.x,
      y: frog.pos.y + 1,
    }));
  }

  isLogLeftOfFrog () {
    const { logs, frog } = this;
    return logs.some(log => log.contains({
      x: frog.pos.x - 1,
      y: frog.pos.y,
    }));
  }

  isLogRightOfFrog () {
    const { logs, frog } = this;
    return logs.some(log => log.contains({
      x: frog.pos.x + 1,
      y: frog.pos.y,
    }));
  }

  isRiverUpOfFrog () {
    const { frog } = this;
    return isInRange(frog.pos.y, [3, 7], '[]');
  }

  isWallUpOfFrog () {
    return this.frog.pos.y <= 0;
  }

  isWallDownOfFrog () {
    return this.frog.pos.y >= MAX_Y;
  }

  isWallLeftOfFrog () {
    return this.frog.pos.x <= 0;
  }

  isWallRightOfFrog () {
    return this.frog.pos.x >= MAX_X;
  }

  hasCarCollision () {
    const { cars, frog } = this;
    return cars.some(car => car.overlapsWith(frog.pos));
  }

  isFrogRidingLog () {
    const { logs, frog } = this;
    return logs.some(log => log.contains(frog.pos));
  }

  isFrogInRiver () {
    const { frog } = this;
    return isInRange(frog.pos.y, [2, 6], '[]');
  }

  isFrogOutOfBoard () {
    const { frog } = this;
    return frog.pos.x < 0 || frog.pos.x >= MAX_X + 1 || frog.pos.y < 0 || frog.pos.y >= MAX_Y + 1;
  }

  hasFrogTouchdown () {
    const { frog } = this;
    return frog.pos.y <= 1;
  }
}

export const getInitialBoard = () => new Board({
  obstacles: [
    ...[1, 6, 11].map(x => new Log({
      pos: { x, y: 2 },
      length: 3,
      velocity: 0.7,
    })),

    ...[1, 6, 12].map(x => new Log({
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

  frog: new Frog({
    pos: {
      x: MAX_X / 2,
      y: MAX_Y,
    },
  }),
});
