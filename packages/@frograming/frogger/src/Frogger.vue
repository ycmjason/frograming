<template>
  <svg tabindex="0"
       @keydown.prevent
       @keydown.up="moveUp"
       @keydown.down="moveDown"
       @keydown.left="moveLeft"
       @keydown.right="moveRight"
       viewBox="0 0 13 15"
       xmlns="http://www.w3.org/2000/svg">
    <component v-for="(obstacle, i) in obstacles"
               :key="i"
        :position="obstacle.pos"
        :length="obstacle.length"
        :is="obstacle.is" />
    <Frog :position="frogPos" />
  </svg>
</template>

<script>
import Frog from './svg-components/Frog.vue';
import getInitialObstacles from './getInitialObstacles';

const MAX_X = 12;
const MAX_Y = 14;

const moveCar = car => {
  car.pos.x = car.pos.x > 0 ? car.pos.x - 1 : MAX_X;
  return car;
};

export default {
  components: { Frog },

  created () {
    this.start();
  },

  beforeDestroy () {
    this.stop();
  },

  data: () => ({
    intervalId: null,
    obstacles: getInitialObstacles({ MAX_X, MAX_Y }),
    frogPos: { x: MAX_X / 2, y: MAX_Y },
  }),

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
  },
};
</script>

<style scoped>
svg {
  display: block;
  margin: 0 auto;
  height: 90vh;
}
</style>
