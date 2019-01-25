<template>
  <Frogger class="froggerSvg"
           :key="uid"
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
    uid: 0,
    controller: new FroggerController(),
    commands: [],
  }),

  computed: {
    ast () {
      try {
        const tree = parse(this.frogCode);
        this.$emit('parsed');
        return tree;
      } catch (e) {
        this.$emit('error', e);
        return null;
      }
    },
    execution () {
      return interpret(this.ast || parse(''));
    },
  },

  watch: {
    execution () {
      this.uid += 1;
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
.froggerSvg {
  height: auto;
  min-height: 80vh;
}
</style>
