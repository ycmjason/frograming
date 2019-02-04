<template>
  <div class="container">
    <Ticker @tick="onTick" :ticking="gameStatus === 'playing'" :interval="100" />
    <ControllerConsumer :controller="controller" @command="onCommand" />
    <svg viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" height="100%" width="100%" fill="skyblue" />

      <Board :board="board" />

      <Banner v-if="gameStatus === 'won'" text="You won!" color="lightgreen" />
      <Banner v-else-if="gameStatus === 'lost'" text="You lost!" color="pink" />

      <Frame color="brown" />
    </svg>
  </div>
</template>

<script>
import Banner from './svg/Banner.vue';
import Board from './svg/Board.vue';
import Frame from './svg/Frame.vue';
import Ticker from './renderless/Ticker.vue';
import ControllerConsumer from './renderless/ControllerConsumer.vue';

import FroggerController from '../models/FroggerController';
import { getInitialBoard } from '../models/Board';

import { isInRange } from '../utils/math';

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

  data: () => ({
    gameStatus: 'playing',
    intervalId: null,
    board: getInitialBoard(),
  }),

  computed: {
    hasCollision () {
      // (obstacle.pos.x <= frogPos.x < obstacle.pos.x + obstacle.length
      //   AND frogPos.y == obstacle.pos.y), for some obstacles
      const { obstacles, frogPos } = this.board;
      return obstacles.some(obstacle => {
        return frogPos.y === obstacle.pos.y
          && isInRange(frogPos.x, [obstacle.pos.x, obstacle.pos.x + obstacle.length], '[)');
      });
    },

    context () {
      const { board } = this;

      return {
        isCarUp: board.isCarUpOfFrog(),
        isCarDown: board.isCarDownOfFrog(),
        isCarLeft: board.isCarLeftOfFrog(),
        isCarRight: board.isCarRightOfFrog(),

        isLogUp: board.isLogUpOfFrog(),
        isLogDown: board.isLogDownOfFrog(),
        isLogLeft: board.isLogLeftOfFrog(),
        isLogRight: board.isLogRightOfFrog(),

        isWallUp: board.isWallUpOfFrog(),
        isWallDown: board.isWallDownOfFrog(),
        isWallLeft: board.isWallLeftOfFrog(),
        isWallRight: board.isWallRightOfFrog(),
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

.container {
  height: 100%;
}
</style>