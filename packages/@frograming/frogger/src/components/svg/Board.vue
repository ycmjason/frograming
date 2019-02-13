<template>
  <g>
    <GoalLine />

    // safe road
    <rect x="0" y="7" width="100%" height="1" fill="#405432" />
    <rect x="0" y="14" width="100%" height="1" fill="#405432" />

    <River />

    <Road />

    <Car v-for="(obstacle, i) in board.shortCarsRight"
              :key="i"
              :obstacle="obstacle"/>

    <CarReversed v-for="(obstacle, i) in board.shortCarsLeft"
              :key="i"
              :obstacle="obstacle"/>

    <Lorry v-for="(obstacle, i) in board.longCars"
              :key="i"
              :obstacle="obstacle"/>

    <Log v-for="(obstacle, i) in board.shortLogs"
              :key="i"
              :obstacle="obstacle"/>

    <LongLog v-for="(obstacle, i) in board.longLogs"
              :key="i"
              :obstacle="obstacle"/>

    <Frog :frog="board.frog" />
  </g>
</template>

<script>
import Board from '../../models/Board';
import River from './River.vue';
import Log from './Log.vue';
import LongLog from './LongLog.vue';
import Road from './Road.vue';
import Car from './Car.vue';
import CarReversed from './CarReversed.vue';
import Lorry from './Lorry.vue';
import Frog from './Frog.vue';
import GoalLine from './GoalLine.vue';

export default {
  components: {
    GoalLine,
    River,
    Log,
    LongLog,
    Road,
    Car,
    CarReversed,
    Lorry,
    Frog,
  },
  props: { board: Board },
};
</script>
