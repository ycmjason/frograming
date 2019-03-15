<template>
  <div class="froggerContainer" v-bind="$attrs" v-on="$listeners">
    <Ticker
        :tickerController="tickerController"
        :ticking="gameStatus === 'playing'"
        @tick="onTick" />

    <ControllerConsumer
        :controller="controller"
        @command="onCommand" />

    <svg viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg">
      <Board :board="board" />

      <template v-if="!hideBanner">
        <Banner @click="hideBanner = true" v-if="gameStatus === 'won'" text="You won!" color="lightgreen" />
        <Banner @click="hideBanner = true" v-else-if="gameStatus === 'lost'" text="You lost!" color="pink" />
      </template>

      <Frame color="#000" :width="200" />
    </svg>
  </div>
</template>

<script>
import Banner from './svg/Banner.vue';
import Board from './svg/Board.vue';
import Frame from './svg/Frame.vue';
import Ticker from './renderless/Ticker.vue';
import ControllerConsumer from './renderless/ControllerConsumer.vue';

import TickerController, { IntervalTickerController } from '../models/TickerController';
import FrogController from '../models/FrogController';
import { getInitialBoard } from '../models/Board';

export const GAME_STATUS = {
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
    tickerController: {
      type: TickerController,
      default: () => new IntervalTickerController(500),
    },
    controller: {
      type: FrogController,
      required: false,
      default: () => new FrogController(),
    },
    boardSettingSeed: {
      type: Number,
      default: () => Math.floor(Math.random() * 50),
    },
  },

  data: vm => ({
    gameStatus: 'playing',
    board: getInitialBoard().tick(vm.boardSettingSeed),
    hideBanner: false,
  }),

  computed: {
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

        isRiverUp: board.isRiverUpOfFrog(),

        isWallUp: board.isWallUpOfFrog(),
        isWallDown: board.isWallDownOfFrog(),
        isWallLeft: board.isWallLeftOfFrog(),
        isWallRight: board.isWallRightOfFrog(),

        isGoalUp: board.frog.pos.y === 2,
      };
    },
  },

  methods: {
    checkBoard () {
      const { board } = this;

      // check car collision
      if (board.hasCarCollision()) {
        return this.lose();
      }

      // check river
      if (board.isFrogInRiver() && !board.isFrogRidingLog()) {
        return this.lose();
      }

      // check out of sight
      if (board.isFrogOutOfBoard()) {
        return this.lose();
      }

      if (board.hasFrogTouchdown()) {
        return this.win();
      }
    },

    win () {
      if (this.gameStatus !== GAME_STATUS.won) {
        this.gameStatus = GAME_STATUS.won;
        this.$emit('gameStatus', GAME_STATUS.won);
      }
    },

    lose () {
      if (this.gameStatus !== GAME_STATUS.lost) {
        this.gameStatus = GAME_STATUS.lost;
        this.$emit('gameStatus', GAME_STATUS.lost);
      }
    },

    onTick () {
      this.board.tick();
      this.$emit('tick', this.context);
      this.checkBoard();
    },

    onCommand (command) {
      if (this.gameStatus !== GAME_STATUS.playing) return;
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
.froggerContainer {
  height: 70vh;
}

svg {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>
