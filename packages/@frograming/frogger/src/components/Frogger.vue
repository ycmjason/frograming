<template>
  <svg viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg">
    <Ticker @tick="onTick" :ticking="gameStatus === 'playing'" :interval="1000" />
    <ControllerConsumer :controller="controller" @command="onCommand" />
    <rect x="0" y="0" height="100%" width="100%" fill="skyblue" />

    <Banner v-if="gameStatus === 'won'" text="You won!" color="lightgreen" />
    <Banner v-else-if="gameStatus === 'lost'" text="You lost!" color="pink" />

    <Board :board="board" />

    <Frame color="brown" />
  </svg>
</template>

<script>
import Banner from './svg/Banner.vue';
import Board from './svg/Board.vue';
import Frame from './svg/Frame.vue';

import Ticker from './renderless/Ticker.vue';
import ControllerConsumer from './renderless/ControllerConsumer.vue';

import FroggerController from '../FroggerController';
import { getInitialGameBoard } from '../FroggerConfig';

const getInitialData = () => ({
  gameStatus: 'playing',
  intervalId: null,
  board: getInitialGameBoard(),
});

const GAME_STATUS = {
  playing: 'playing',
  won: 'won',
  lost: 'lost',
};

export default {
  components: {
    Banner,
    Ticker,
    ControllerConsumer,
    Board,
    Frame,
  },

  props: {
    controller: {
      type: FroggerController,
      required: false,
      default: () => new FroggerController(),
    },
  },

  data: () => getInitialData(),

  computed: {
    hasCollision () {
      // (obstacle.pos.x <= frogPos.x < obstacle.pos.x + obstacle.length
      //   AND frogPos.y == obstacle.pos.y), for some obstacles
      const { obstacles, frogPos } = this.board;
      return obstacles.some(obstacle => {
        return frogPos.y === obstacle.pos.y
          && obstacle.pos.x <= frogPos.x && frogPos.x < obstacle.pos.x + obstacle.length;
      });
    },

    context () {
      const { board } = this;
      const { frogPos, obstacles } = board;

      const isUp = (pos1, pos2) => pos1.x === pos2.x && pos1.y + 1 === pos2.y;
      const isRight = (pos1, pos2) => pos1.x - 1 === pos2.x && pos1.y === pos2.y;
      const isDown = (pos1, pos2) => pos1.x === pos2.x && pos1.y - 1 === pos2.y;
      const isLeft = (pos1, pos2) => pos1.x + 1 === pos2.x && pos1.y === pos2.y;

      return {
        isCarUp: obstacles.some(({ type, pos }) => type === 'car' && isUp(pos, frogPos)),
        isCarRight: obstacles.some(({ type, pos }) => type === 'car' && isRight(pos, frogPos)),
        isCarDown: obstacles.some(({ type, pos }) => type === 'car' && isDown(pos, frogPos)),
        isCarLeft: obstacles.some(({ type, pos }) => type === 'car' && isLeft(pos, frogPos)),
        isLogUp: obstacles.some(({ type, pos }) => type === 'log' && isUp(pos, frogPos)),
        isLogRight: obstacles.some(({ type, pos }) => type === 'log' && isRight(pos, frogPos)),
        isLogDown: obstacles.some(({ type, pos }) => type === 'log' && isDown(pos, frogPos)),
        isLogLeft: obstacles.some(({ type, pos }) => type === 'log' && isLeft(pos, frogPos)),
        isWallUp: obstacles.some(({ type, pos }) => type === 'wall' && isUp(pos, frogPos)),
        isWallRight: obstacles.some(({ type, pos }) => type === 'wall' && isRight(pos, frogPos)),
        isWallDown: obstacles.some(({ type, pos }) => type === 'wall' && isDown(pos, frogPos)),
        isWallLeft: obstacles.some(({ type, pos }) => type === 'wall' && isLeft(pos, frogPos)),
      };
    },
  },

  methods: {
    checkCollision () {
      if (!this.hasCollision) return;
      this.lost();
    },

    start () {
      this.gameStatus = GAME_STATUS.playing;
    },

    won () {
      this.gameStatus = GAME_STATUS.won;
    },

    lost () {
      this.gameStatus = GAME_STATUS.lost;
    },

    onTick () {
      this.board.obstacles.forEach(obstacle => obstacle.move());
      this.$emit('tick', this.context);
      this.checkCollision();
    },

    onCommand (command) {
      this[command]();
      this.checkCollision();
    },

    move (direction) {
      const { frogPos } = this.board;
      switch (direction) {
        case 'up':
          frogPos.y--;
          break;
        case 'down':
          frogPos.y++;
          break;
        case 'left':
          frogPos.x--;
          break;
        case 'right':
          frogPos.x++;
          break;
        default:
          throw Error(`Cannot move ${direction}.`);
      }
      this.checkCollision();
    },

    moveUp () {
      this.move('up');
    },

    moveDown () {
      this.move('down');
    },

    moveLeft () {
      this.move('left');
    },

    moveRight () {
      this.move('right');
    },

    NO_OP: () => {},
    TERMINATED: () => {},
  },
};
</script>

<style scoped>
svg {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>
