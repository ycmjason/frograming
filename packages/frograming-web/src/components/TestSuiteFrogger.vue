<template>
  <Frogger :key="uid"
           :controller="controller"
           :tickerController="tickerController"
           :boardSettingSeed="seed"
           @tick="onTick"
           @gameStatus="onGameStatus" />
</template>

<script>
import { Frogger, FrogController, IntervalTickerController } from '@frograming/frogger';

const NUMBER_OF_CONFIGURATION = 50;
const INTERVAL = 50;
const TIMEOUT_STEPS = 60;

export default {
  components: { Frogger },

  props: ['execution'],

  data: () => ({
    uid: 0,
    controller: new FrogController(),
    tickerController: new IntervalTickerController(INTERVAL),
    seed: 0,
    steps: 0,
    results: [],
    testing: true,
  }),

  watch: {
    execution () {
      this.uid += 1;
    },
  },

  methods: {
    restart () {
      this.steps = 0;
      this.uid++;
    },

    onTick (context) {
      if (this.steps >= TIMEOUT_STEPS) {
        this.$emit('timeout', { seed: this.seed, steps: this.step });
        this.testing = false;
      }

      const { execution, controller } = this;
      const command = execution.tick(context);
      controller.emit(command);
      this.steps += 1;
    },

    onGameStatus (status) {
      const { results, seed, steps } = this;

      results.push({
        seed,
        passed: status === 'won',
        steps,
      });

      this.$emit('results', results);
      if (this.results.length < NUMBER_OF_CONFIGURATION) {
        this.seed += 1;
        this.restart();
      } else {
        this.$emit('finished');
      }
    },
  },
};
</script>
