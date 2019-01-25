<template>
  <svg viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg">
    <Ticker @tick="onTick" :ticking="gameStatus === 'playing'" ms="1000" />
    <ControllerConsumer :controller="controller" @command="onCommand" />
    <rect x="0" y="0" height="100%" width="100%" fill="skyblue" />

    <Banner v-if="gameStatus === 'won'" text="You won!" color="lightgreen" />
    <Banner v-else-if="gameStatus === 'lost'" text="You lost!" color="pink" />

    <component v-for="(obstacle, i) in obstacles"
               :key="i"
               :position="obstacle.pos"
               :length="obstacle.length"
               :is="obstacle.is" />
    <Frog :position="frogPos" />
  </svg>
</template>

<script>
import Frog from './svg/Frog.vue';
import Banner from './svg/Banner.vue';
import Car from './svg/Car.vue';

import Ticker from './renderless/Ticker.vue';
import ControllerConsumer from './renderless/ControllerConsumer.vue';

import FroggerController from '../FroggerController';

const MAX_X = 12;
const MAX_Y = 14;

const getInitialObstacles = ({ MAX_X, MAX_Y }) => [
  // first row
  { pos: { x: 0, y: MAX_Y - 1 }, length: 1 },
  { pos: { x: 4, y: MAX_Y - 1 }, length: 1 },
  { pos: { x: 8, y: MAX_Y - 1 }, length: 1 },
  { pos: { x: 12, y: MAX_Y - 1 }, length: 1 },
  // second row
  { pos: { x: 1, y: MAX_Y - 2 }, length: 1 },
  { pos: { x: 4, y: MAX_Y - 2 }, length: 1 },
  { pos: { x: 9, y: MAX_Y - 2 }, length: 1 },
  { pos: { x: 12, y: MAX_Y - 2 }, length: 1 },
].map(obj => ({ ...obj, is: Car }));

const moveCar = car => {
  car.pos.x = car.pos.x > 0 ? car.pos.x - 1 : MAX_X;
  return car;
};

const getInitialData = () => ({
  gameStatus: 'playing',
  intervalId: null,
  obstacles: getInitialObstacles({ MAX_X, MAX_Y }),
  frogPos: { x: MAX_X / 2, y: MAX_Y },
});

const GAME_STATUS = {
  playing: 'playing',
  won: 'won',
  lost: 'lost',
};

export default {
  components: {
    Frog,
    Banner,
    Ticker,
    ControllerConsumer,
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
      const { obstacles, frogPos } = this;
      return obstacles.some(obstacle => {
        return frogPos.y === obstacle.pos.y
          && obstacle.pos.x <= frogPos.x && frogPos.x < obstacle.pos.x + obstacle.length;
      });
    },

    context () {
      return {
        isCarUp: false,
        isCarRight: false,
        isCarDown: false,
        isCarLeft: false,
        isLogUp: false,
        isLogRight: false,
        isLogDown: false,
        isLogLeft: false,
        isWallUp: false,
        isWallRight: false,
        isWallDown: false,
        isWallLeft: false,
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
      this.obstacles.forEach(moveCar);
      this.checkCollision();
      this.$emit('tick', this.context);
    },

    onCommand (command) {
      this[command]();
      this.checkCollision();
    },

    move (direction) {
      const { frogPos } = this;
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
