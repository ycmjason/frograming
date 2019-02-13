<template>
  <div class="split">
    <div class="editorArea">
      <ParserMessage :error="currentError" class="message" />
      <Editor class="editor" v-model="frogCode" />
    </div>

    <div @click="uid++" class="froggerSvgContainer">
      <Frogger :key="uid"
               :controller="controller"
               @tick="onTick"
               @gameStatus="$emit('gameStatus', $event)" />
    </div>
  </div>
</template>

<script>
import { parse, interpret } from '@frograming/language';
import { Frogger, FrogController } from '@frograming/frogger';
import Editor from '@/components/Editor.vue';
import ParserMessage from '@/components/ParserMessage.vue';
import { stripIndent } from 'common-tags';

import debounce from 'lodash.debounce';

export default {
  components: { Editor, ParserMessage, Frogger },

  data: () => ({
    uid: 0,
    currentError: null,
    frogCode: stripIndent`
      onTick {
        exec moveUp;
      }
    `,
    controller: new FrogController(),
    ast: null,
    execution: interpret(null),
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
          this.currentError = null;
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

<style scoped>
.split {
  display: flex;
}

.editorArea {
  flex-basis: 50%;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
}

.editor {
  flex-basis: 80vh;
  flex-grow: 1;
}

.froggerSvgContainer {
  flex-grow: 1;
  max-height: 80vh;
}

.message {
  margin-bottom: 1rem;
}
</style>
