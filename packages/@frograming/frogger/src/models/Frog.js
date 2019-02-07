import { round } from '../utils/math';

export default class Frog {
  constructor ({ pos: {x, y} }) {
    this.pos = { x, y };
  }

  moveUp (velocity = 1) {
    const { pos } = this;
    pos.y = round(pos.y - velocity, 5);
  }

  moveRight (velocity = 1) {
    const { pos } = this;
    pos.x = round(pos.x + velocity, 5);
  }

  moveDown (velocity = 1) {
    const { pos } = this;
    pos.y = round(pos.y + velocity, 5);
  }

  moveLeft (velocity = 1) {
    const { pos } = this;
    pos.x = round(pos.x - velocity, 5);
  }
}
