<template>
  <section>
    <h3>The ultimate test suite</h3>
    <p>Automated testing is really important in programming. This ultimate test suite will ensure your code is correct in every configuration.</p>
    <button @click="test" v-if="!running">Run the test</button>
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
      <div v-if="!running && !isTimeout">
        {{ passedCount }} passed, {{ failedCount }} failed. ({{ ((endTime - startTime) / 60000).toFixed(2) }} min)
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
    passedCount () {
      return this.results.filter(({ passed }) => passed).length;
    },
    failedCount () {
      return this.results.filter(({ passed }) => !passed).length;
    },
  },

  methods: {
    onTimeout () {
      this.running = false;
      this.isTimeout = true;
    },

    onFinished () {
      this.running = false;
      this.endTime = Date.now();
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
.test__result {
  margin: 1rem auto;

  table {
    width: 100%;

    th {
      text-transform: uppercase;
    }

    td.bg-success {
      background: #adf1ad;
    }

    td.bg-failed {
      background: #f59696;
    }
  }
}
</style>
