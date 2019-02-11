<template>
  <g>
    <GoalLine />

    // safe road
    <rect x="0" y="7" width="100%" height="1" fill="#b52cff" />
    <rect x="0" y="14" width="100%" height="1" fill="#b52cff" />

    // river
    <rect x="0" y="2" height="5" width="100%" fill="skyblue" />

    // road
    <rect x="0" y="8" height="6" width="100%" fill="#232222" />

    <Obstacle v-for="(obstacle, i) in board.obstacles"
              :key="i"
              :obstacle="obstacle"/>

    <Frog :frog="board.frog" />
  </g>
</template>

<script>
import Board from '../../models/Board';
import Obstacle from './Obstacle.vue';
import Frog from './Frog.vue';
import GoalLine from './GoalLine.vue';

export default {
  components: { Obstacle, Frog, GoalLine },
  props: { board: Board },
};
</script>
