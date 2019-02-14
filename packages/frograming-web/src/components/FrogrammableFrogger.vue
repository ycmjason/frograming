<template>
  <main>
    <div class="editorArea">
      <ParserMessage :error="currentError" class="message" />
      <Editor class="editor" :value="frogCode" @input="$emit('input', $event)" />
    </div>

    <div class="froggerArea">
      <div class="froggerSettings">
        <label title="Control tick with SPACE">
          <input type="checkbox" v-model="debug"> Debug mode
        </label>
      </div>
      <div @click="uid++" class="froggerSvgContainer">
        <Frogger :key="uid"
                 :controller="controller"
                 :debug="debug"
                 @tick="onTick"
                 @gameStatus="$emit('gameStatus', $event)" />
      </div>
    </div>
  </main>
</template>

<script>
import { parse, interpret } from '@frograming/language';
import { Frogger, FrogController } from '@frograming/frogger';
import Editor from '@/components/Editor.vue';
import ParserMessage from '@/components/ParserMessage.vue';

import debounce from 'lodash.debounce';

export default {
  components: { Editor, ParserMessage, Frogger },

  model: { prop: 'frogCode', event: 'input' },

  props: ['frogCode'],

  data: () => ({
    uid: 0,
    currentError: null,
    controller: new FrogController(),
    ast: null,
    execution: interpret(null),
    debug: false,
  }),

  watch: {
    execution () {
      this.uid += 1;
    },

    frogCode: {
      immediate: true,
      handler: debounce(function () {
        try {
          const { frogCode } = this;
          this.ast = parse(frogCode);
          this.execution = interpret(this.ast);
          this.currentError = null;
          this.$emit('frogCode', frogCode);
        } catch (e) {
          this.ast = null;
          this.execution = interpret(null);
          this.currentError = e;
        }
      }, 500),
    },
  },

  methods: {
    onTick (context) {
      const { execution, controller } = this;
      const command = execution.tick(context);
      controller.emit(command);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/config.scss';

main {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 1rem;

  @media screen and (min-width: $breakpoint-md) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }
}

.editorArea {
  display: flex;
  flex-direction: column;
}

.editor {
  height: 80vh;
}

.froggerArea {
  display: flex;
  flex-direction: column;
}

.froggerSettings {
  padding: 1rem;
  margin-bottom: 1rem;

  label {
    display: inline-flex;
    align-items: center;
  }
}

.froggerSvgContainer {
  height: 80vh;
}

.message {
  margin-bottom: 1rem;
}
</style>
