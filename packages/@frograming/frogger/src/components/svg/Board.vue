<template>
  <g>
    <Obstacle v-for="(obstacle, i) in board.obstacles"
              :key="i"
              :obstacle="obstacle"/>

    <Frog :position="board.frogPos" />
  </g>
</template>

<script>
import Board from '../../models/Board';
import Obstacle from './Obstacle.vue';
import Frog from './Frog.vue';

export default {
  components: { Obstacle, Frog },
  props: {
    board: Board,
  },
};
</script>
