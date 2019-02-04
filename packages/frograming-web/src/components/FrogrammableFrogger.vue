<template>
  <div @click="uid++" class="froggerSvgContainer">
    <Frogger :key="uid"
             :controller="controller"
             @tick="onTick"
             @gameOver="$emit('gameOver', $event)" />
  </div>
</template>

<script>
import { parse, interpret } from '@frograming/language';
import { Frogger, FroggerController } from '@frograming/frogger';

import debounce from 'lodash.debounce';

export default {
  components: { Frogger },

  props: {
    frogCode: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    uid: 0,
    controller: new FroggerController(),
    commands: [],
    ast: null,
    execution: interpret(''),
  }),

  watch: {
    execution () {
      this.uid += 1;
    },

    frogCode: {
      immediate: true,
      handler: debounce(function () {
        try {
          this.ast = parse(this.frogCode);
          this.execution = interpret(this.ast);
          this.$emit('parsed');
        } catch (e) {
          this.ast = null;
          this.execution = interpret('');
          this.$emit('error', e);
        }
      }, 500),
    },
  },

  methods: {
    onTick (context) {
      const { execution, controller } = this;
      const command = execution.step(context);
      controller.emit(command);
    },
  },
};
</script>

<style scoped>
.froggerSvgContainer {
  height: auto;
  max-height: 90vh;
}
</style>
