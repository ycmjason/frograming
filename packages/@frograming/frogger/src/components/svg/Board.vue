<template>
  <g>
    <GoalLine />

    // safe road
    <rect x="0" y="7" width="100%" height="1" fill="#405432" />
    <rect x="0" y="14" width="100%" height="1" fill="#405432" />

    <River />

    <Road />

    <Obstacle v-for="(obstacle, i) in board.obstacles"
              :key="i"
              :obstacle="obstacle"/>

    <Frog :frog="board.frog" />
  </g>
</template>

<script>
import Board from '../../models/Board';
import River from './River.vue';
import Obstacle from './Obstacle.vue';
import Road from './Road.vue';
import Frog from './Frog.vue';
import GoalLine from './GoalLine.vue';

export default {
  components: {
    GoalLine,
    River,
    Obstacle,
    Road,
    Frog,
  },
  props: { board: Board },
};
</script>
