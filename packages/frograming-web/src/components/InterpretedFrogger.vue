<template>
  <div>
    <ParserMessage :error="currentError" class="message" />
    <input
        v-model="input"
        @keypress.enter.prevent="submitCommand"
        @keydown.up.prevent="prevCommand"
        @keydown.down.prevent="nextCommand"
        placeholder="Type in an exec statements."
        autofocus>
    <div>
      <Frogger :key="uid"
               :boardSettingSeed="0"
               :tickerController="neverTicker"
               :controller="controller"
               @gameStatus="$emit('gameStatus', $event)" />

      <section class="froggerControls">
        <button @click="uid++">Restart</button>
      </section>
    </div>
  </div>
</template>

<script>
import { Frogger, FrogController, TickerController } from '@frograming/frogger';
import { parse } from '@frograming/language';

import ParserMessage from '@/components/ParserMessage.vue';

export default {
  components: { Frogger, ParserMessage },

  data: () => ({
    uid: 0,
    controller: new FrogController(),
    input: '',
    currentError: null,
    history: [],
    historyPointer: 0,
    neverTicker: new TickerController(),
  }),

  methods: {
    prevCommand () {
      const { history } = this;
      if (this.historyPointer <= 0) return;
      this.historyPointer--;
      this.input = history[this.historyPointer];
    },
    nextCommand () {
      const { history } = this;
      if (this.historyPointer >= history.length) return;
      this.historyPointer++;
      this.input = history[this.historyPointer];
    },
    submitCommand () {
      try {
        const nodes = parse.Lines(this.input.trim());
        if (nodes.length > 1) {
          throw Error(`Expected only 1 line, received ${nodes.length}.`);
        }

        const { type, name } = nodes[0];
        if (type !== 'command') {
          throw Error(`Expected "exec" statement.`);
        }

        this.currentError = null;
        this.controller.emit(name);

        this.history.push(this.input);
        this.historyPointer = this.history.length;
        this.input = '';
      } catch (e) {
        this.currentError = e;
      }
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
}

.message {
  margin: 1rem 0;
}
</style>
