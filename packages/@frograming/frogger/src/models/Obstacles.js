import { mod } from '../utils/math';
import { MAX_X } from './Board';

class AbstractObstacle {
  type = 'abstract-obstacle';

  constructor ({ pos: {x, y}, length, color, velocity }) {
    this.pos = { x, y };
    this.length = length;
    this.color = color;
    this.velocity = velocity;
  }

  move () {
    const { pos, velocity, length } = this;
    pos.x = mod(pos.x + length + velocity, MAX_X + 1 + length) - length;
    return this;
  }
}

export class Car extends AbstractObstacle {
  type = 'car';
}

export class Log extends AbstractObstacle {
  type = 'log';
}