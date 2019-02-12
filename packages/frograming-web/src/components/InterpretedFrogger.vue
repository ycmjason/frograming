<template>
  <div>
    <ParserMessage :error="currentError" class="message" />
    <input
        v-model="input"
        @keypress.enter.prevent="submitCommand"
        placeholder="Type in an exec statements."
        autofocus>
    <div @click="uid++" class="froggerSvgContainer">
      <Frogger :key="uid"
               :interval="Infinity"
               boardSetting="empty"
               :controller="controller"
               @tick="onTick"
               @gameStatus="$emit('gameStatus', $event)" />
    </div>
  </div>
</template>

<script>
import { Frogger, FrogController } from '@frograming/frogger';
import { parse } from '@frograming/language';

import ParserMessage from '@/components/ParserMessage.vue';

export default {
  components: { Frogger, ParserMessage },

  data: () => ({
    uid: 0,
    controller: new FrogController(),
    input: '',
    currentError: null,
  }),

  methods: {
    submitCommand () {
      try {
        const [{ type, name }] = parse.Lines(this.input.trim());

        if (type !== 'command') throw Error(`Expected "exec" statement.`);

        this.currentError = null;
        this.controller.emit(name);
      } catch (e) {
        this.currentError = e;
      }
    },

    onTick (context) {
    },
  },
};
</script>

<style scoped>
.froggerSvgContainer {
  height: 70vh;
}

input {
  width: 100%;
}

.message {
  margin: 1rem 0;
}
</style>
