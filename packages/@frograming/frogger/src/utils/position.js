import { isInRange } from './math';

export const isUp = (obj1, obj2) => {
  obj1.pos.x === obj2.pos.x && obj1.pos.y + 1 === obj2.pos.y;
};

export const isRight = (obj1, obj2) => {
  obj1.pos.x - 1 === obj2.pos.x && obj1.pos.y === obj2.pos.y;
};

export const isDown = (obj1, obj2) => {
  obj1.pos.x === obj2.pos.x && obj1.pos.y - 1 === obj2.pos.y;
};

export const isLeft = (obj1, obj2) => {
  obj1.pos.x + 1 === obj2.pos.x && obj1.pos.y === obj2.pos.y;
};