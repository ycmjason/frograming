<template>
  <div class="container">
    <Ticker debug @tick="onTick" :ticking="gameStatus === 'playing'" :interval="100" />
    <ControllerConsumer :controller="controller" @command="onCommand" />
    <svg viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg">
      <Board :board="board" />

      <Banner v-if="gameStatus === 'won'" text="You won!" color="lightgreen" />
      <Banner v-else-if="gameStatus === 'lost'" text="You lost!" color="pink" />

      <Frame color="#000" :width="6" />
    </svg>
  </div>
</template>

<script>
import Banner from './svg/Banner.vue';
import Board from './svg/Board.vue';
import Frame from './svg/Frame.vue';
import Ticker from './renderless/Ticker.vue';
import ControllerConsumer from './renderless/ControllerConsumer.vue';

import FrogController from '../models/FrogController';
import { getInitialBoard, MAX_X, MAX_Y } from '../models/Board';

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
      type: FrogController,
      required: false,
      default: () => new FrogController(),
    },
  },

  data: () => ({
    gameStatus: 'playing',
    intervalId: null,
    board: getInitialBoard(),
  }),

  computed: {
    hasCollision () {
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
    checkBoard () {
      const { obstacles, frog } = this.board;

      // check car collision
      const cars = obstacles.filter(({ type }) => type === 'car');
      if (cars.some(car => car.overlapsWith(frog.pos))) {
        return this.lose();
      }

      // check river
      const logs = obstacles.filter(({ type }) => type === 'log');
      if (isInRange(frog.pos.y, [2, 6], '[]') && logs.every(log => !log.contains(frog.pos))) {
        return this.lose();
      }

      // check out of sight
      if (frog.pos.x < 0 || frog.pos.x >= MAX_X + 1 || frog.pos.y < 0 || frog.pos.y >= MAX_Y + 1) {
        return this.lose();
      }

      if (frog.pos.y <= 1) {
        return this.win();
      }
    },

    start () {
      this.gameStatus = GAME_STATUS.playing;
    },

    win () {
      this.gameStatus = GAME_STATUS.won;
    },

    lose () {
      this.gameStatus = GAME_STATUS.lost;
    },

    onTick () {
      this.board.tick();
      this.$emit('tick', this.context);
      this.checkBoard();
    },

    onCommand (command) {
      if (!command) return;

      if (/^move(Up|Right|Down|Left)$/.test(command)) {
        const moveDirection = command.match(/move(Up|Right|Down|Left)/)[0];
        this.board.frog[moveDirection]();
      }

      this.checkBoard();
    },
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
