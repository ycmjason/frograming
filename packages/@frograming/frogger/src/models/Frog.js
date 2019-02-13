import { round } from '../utils/math';

export default class Frog {
  constructor ({ pos: {x, y} }) {
    this.pos = { x, y };
    this.rotate = 0;
  }

  moveUp (velocity = 1, opts = {}) {
    const { skipRotate = false } = opts;
    const { pos } = this;
    pos.y = round(pos.y - velocity, 5);

    if (!skipRotate) {
      this.rotate = 0;
    }
  }

  moveRight (velocity = 1, opts = {}) {
    const { skipRotate = false } = opts;
    const { pos } = this;
    pos.x = round(pos.x + velocity, 5);

    if (!skipRotate) {
      this.rotate = 90;
    }
  }

  moveDown (velocity = 1, opts = {}) {
    const { skipRotate = false } = opts;
    const { pos } = this;
    pos.y = round(pos.y + velocity, 5);

    if (!skipRotate) {
      this.rotate = 180;
    }
  }

  moveLeft (velocity = 1, opts = {}) {
    const { skipRotate = false } = opts;
    const { pos } = this;
    pos.x = round(pos.x - velocity, 5);

    if (!skipRotate) {
      this.rotate = 270;
    }
  }
}
