import { mod, round, isInRange } from '../utils/math';
import { MAX_X } from './Board';

import CarComponent from '../components/svg/obstacles/Car.vue';
import LorryComponent from '../components/svg/obstacles/Lorry.vue';
import LogComponent from '../components/svg/obstacles/Log.vue';
import LongLogComponent from '../components/svg/obstacles/LongLog.vue';

const nextUid = (() => {
  let uid = 0;
  return () => uid++;
})();

const FROG_WIDTH = 1;
const TOLERANCE_THRESHOLD = 0.15;

class AbstractObstacle {
  type = 'abstract-obstacle';

  get component () {
    switch (this.type) {
      case 'car':
        if (this.length < 2) return CarComponent;
        if (this.length >= 2) return LorryComponent;
        break;
      case 'log':
        if (this.length <= 3) return LogComponent;
        if (this.length > 3) return LongLogComponent;
        break;
    }

    throw Error(`No component defined for ${this.type}.`);
  }

  constructor ({ pos: {x, y}, length, color, velocity }) {
    this.uid = nextUid();
    this.pos = { x, y };
    this.length = length;
    this.color = color;
    this.velocity = velocity;
  }

  move () {
    const { pos, velocity, length } = this;
    pos.x = round(mod(pos.x + length + velocity, MAX_X + 1 + length) - length, 5);
    return this;
  }

  overlapsWith ({x, y}) {
    const { pos, length } = this;
    return y === pos.y && isInRange(x, [pos.x - FROG_WIDTH + TOLERANCE_THRESHOLD, pos.x + length - TOLERANCE_THRESHOLD], '()');
  }

  contains ({x, y}) {
    const { pos, length } = this;
    return y === pos.y && isInRange(x, [pos.x - TOLERANCE_THRESHOLD, round(pos.x + length - FROG_WIDTH, 5) + TOLERANCE_THRESHOLD], '[]');
  }
}

export class Car extends AbstractObstacle {
  type = 'car';
}

export class Log extends AbstractObstacle {
  type = 'log';
}
