<template>
  <svg viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg">
    <Frame fill="#8fbc8f" />
    <g v-if="gameStatus === 'playing'">
      <component v-for="(obstacle, i) in obstacles"
                 :key="i"
                 :position="obstacle.pos"
                 :length="obstacle.length"
                 :is="obstacle.is" />
      <Frog :position="frogPos" />
    </g>
    <GameLostPage  v-else-if="gameStatus === 'lost'" />
    <GameWonPage  v-else-if="gameStatus === 'won'" />
  </svg>
</template>

<script>
import Frog from './svg-components/Frog.vue';
import Frame from './svg-components/Frame.vue';
import GameLostPage from './svg-components/GameLostPage.vue';
import GameWonPage from './svg-components/GameWonPage.vue';
import FroggerController from './FroggerController';

import getInitialObstacles from './getInitialObstacles';

const MAX_X = 12;
const MAX_Y = 14;

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

export default {
  components: {
    Frog,
    Frame,
    GameLostPage,
    GameWonPage,
  },

  props: {
    controller: {
      type: FroggerController,
      required: false,
      default: () => new FroggerController(),
    },
  },

  data: () => getInitialData(),

  created () {
    this.start();
    this.unsubscribe = this.controller.subscribe(this.onCommand);
  },

  beforeDestroy () {
    this.stop();
    this.unsubscribe();
  },

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
      this.stop();
      this.$emit('gameOver', 'lose');
    },

    start () {
      this.intervalId = setInterval(this.onTick, 1000);
    },

    stop () {
      clearInterval(this.intervalId);
    },

    onTick () {
      this.obstacles.forEach(moveCar);
      this.checkCollision();
      this.$emit('tick', this.context);
    },

    onCommand (command) {
      this[command]();
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

    reset () {
      Object.assign(this.$data, getInitialData());
    },
  },
};
</script>

<style scoped>
svg {
  display: block;
  margin: 0 auto;
}
</style>
