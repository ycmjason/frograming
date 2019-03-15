<template>
  <section>
    <h3>The ultimate test suite</h3>
    <p>Automated testing is really important in programming. This ultimate test suite will ensure your code is correct in every configuration.</p>
    <button @click="test" v-if="!running">Run the test</button>

    <div class="test__timeout" v-if="!running && isTimeout">
      <p>Your code does not finish after 60 ticks. Does it do anything at all?</p>
    </div>

    <div class="test__result" v-if="results.length > 0">
      <table>
        <tr>
          <th>seed</th>
          <th>status</th>
          <th>steps</th>
        </tr>
        <tr v-for="result in results" :key="result.seed">
          <td>{{ result.seed }}</td>
          <td :class="result.passed? 'bg-success': 'bg-failed'">{{ result.passed? 'PASSED': 'FAILED' }}</td>
          <td>{{ result.steps }}</td>
        </tr>
      </table>
      <div v-if="!running && !isTimeout && !Number.isNaN(runTime)">
        {{ passedResults.length }} passed, {{ failedResults.length }} failed. ({{ runTime }} mins)
      </div>
    </div>

    <div class="test__runner" v-if="running">
      <TestSuiteFrogger
        :execution="execution"
        @results="results = $event"
        @timeout="onTimeout"
        @finished="onFinished" />
    </div>
  </section>
</template>

<script>
import TestSuiteFrogger from './TestSuiteFrogger.vue';

export default {
  components: { TestSuiteFrogger },
  props: {
    execution: {
      required: true,
    },
  },

  data: vm => ({
    running: false,
    isTimeout: false,
    results: [],
    startTime: undefined,
    endTime: undefined,
  }),

  computed: {
    runTime () {
      if (!this.endTime || !this.startTime) return '';
      return ((this.endTime - this.startTime) / 60000).toFixed(2);
    },
    passedResults () {
      return this.results.filter(({ passed }) => passed);
    },
    failedResults () {
      return this.results.filter(({ passed }) => !passed);
    },
    passedAverageSteps () {
      if (this.passedResults.length <= 0) return 0;
      const sum = this.passedResults
        .map(({ steps }) => steps)
        .reduce((x, y) => x + y);
      return sum / this.passedResults.length;
    },
  },

  methods: {
    onTimeout (seed) {
      this.running = false;
      this.isTimeout = true;
      this.$ga.event('TestSuite', 'timeout', `${seed}`);
    },

    onFinished () {
      this.running = false;
      this.endTime = Date.now();
      this.$ga.event('TestSuite', 'finished', 'runTime', Number(this.runTime));
      if (this.passedResults >= 0) {
        this.$ga.event('TestSuite', 'finished', 'passed', this.passedResults.length);
        this.$ga.event('TestSuite', 'finished', 'passedAvgSteps', this.passedAverageSteps);
      }
    },

    test () {
      this.results = [];
      this.running = true;
      this.startTime = Date.now();
    },
  },
};
</script>

<style lang="scss" scoped>
.test__timeout {
  color: #721c24;
}

.test__result {
  margin: 1rem auto;

  table {
    width: 100%;

    th {
      text-transform: uppercase;
    }

    td.bg-success {
      color: #155724;
      background-color: #d4edda;
    }

    td.bg-failed {
      background: #f8d7da;
      color: #721c24;
    }
  }
}
</style>
