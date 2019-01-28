export const isUp = (pos1, pos2) => pos1.x === pos2.x && pos1.y + 1 === pos2.y;
export const isRight = (pos1, pos2) => pos1.x - 1 === pos2.x && pos1.y === pos2.y;
export const isDown = (pos1, pos2) => pos1.x === pos2.x && pos1.y - 1 === pos2.y;
export const isLeft = (pos1, pos2) => pos1.x + 1 === pos2.x && pos1.y === pos2.y;
