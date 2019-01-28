<template>
  <g>
    <Obstacle v-for="(obstacle, i) in board.obstacles"
              :key="i"
              :obstacle="obstacle"/>

    <Frog :position="board.frogPos" />
  </g>
</template>

<script>
import Obstacle from './Obstacle.vue';
import Frog from './Frog.vue';

export default {
  components: { Obstacle, Frog },
  props: ['board'],
};
</script>
