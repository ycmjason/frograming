<template>
  <g>
    <GoalLine />

    // safe road
    <rect x="0" y="7" width="100%" height="1" fill="#405432" />
    <rect x="0" y="14" width="100%" height="1" fill="#405432" />

    // river
    <rect x="0" y="2" height="5" width="100%" fill="skyblue" />

    // ripples
    <path d="M1,3.5 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>
    <path d="M5,5.7 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>
    <path d="M8,2.4 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>
    <path d="M3,4.6 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>
    <path d="M11,6.1 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>
    <path d="M1.5,6.6 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>
    <path d="M5.5,2.7 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>
    <path d="M8,2.4 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>
    <path d="M7,4.2 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>
    <path d="M11,3.3 a0.8,1.2,0,0,1,0.8,0 a0.8,1.2,0,0,0,0.8,0" stroke="blue" fill="none" stroke-width="0.02"/>

    // river bank
    <line x1="0" y1="2" x2="100%" y2="2" stroke="#a02828" stroke-width="0.1" />
    <line x1="0" y1="7" x2="100%" y2="7" stroke="#a02828" stroke-width="0.1" />

    // road
    <rect x="0" y="8" height="6" width="100%" fill="#464444" />

    // road markings
    <line x1="0" y1="8" x2="100%" y2="8" stroke="white" stroke-width="0.1" />
    <line x1="0.125" y1="9" x2="100%" y2="9" stroke="white" stroke-width="0.1" stroke-dasharray="0.25, 0.25" />
    <line x1="0.125" y1="10" x2="100%" y2="10" stroke="white" stroke-width="0.1" stroke-dasharray="0.25, 0.25" />
    <line x1="0.125" y1="11" x2="100%" y2="11" stroke="white" stroke-width="0.1" stroke-dasharray="0.25, 0.25" />
    <line x1="0.125" y1="12" x2="100%" y2="12" stroke="white" stroke-width="0.1" stroke-dasharray="0.25, 0.25" />
    <line x1="0.125" y1="13" x2="100%" y2="13" stroke="white" stroke-width="0.1" stroke-dasharray="0.25, 0.25" />
    <line x1="0" y1="14" x2="100%" y2="14" stroke="white" stroke-width="0.1" />


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
import Car from './Car.vue';
import CarReversed from './CarReversed.vue';
import Lorry from './Lorry.vue';
import Log from './Log.vue';
import LongLog from './LongLog.vue';
import Frog from './Frog.vue';
import GoalLine from './GoalLine.vue';

export default {
  components: { Car, CarReversed, Lorry, Log, LongLog, Frog, GoalLine },
  props: { board: Board },
};
</script>
