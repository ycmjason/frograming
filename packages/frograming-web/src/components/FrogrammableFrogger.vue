<template>
  <Frogger class="froggerSvg"
           :controller="controller"
           @tick="onTick"
           @gameOver="$emit('gameOver', $event)" />
</template>

<script>
import { parse, interpret } from '@frograming/language';
import { Frogger, FroggerController } from '@frograming/frogger';

export default {
  components: { Frogger },

  props: {
    frogCode: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    controller: new FroggerController(),
    commands: [],
  }),

  computed: {
    executionTree () {
      try {
        return parse(this.frogCode);
      } catch (e) {
        this.$emit('error', e);
        return [];
      }
    },
  },

  watch: {
    frogCode () {
      this.controller.emit('reset');
    },
  },

  methods: {
    onTick (context) {
      const { executionTree, controller } = this;
      const commands = interpret(executionTree, context);

      for (const command of commands) {
        controller.emit(command);
      }
    },
  },
};
</script>

<style scoped>
.froggerSvg {
  height: auto;
  min-height: 80vh;
}
</style>
