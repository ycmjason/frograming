<template>
  <div class="home container">
    <div class="error" v-if="currentError">{{ currentError.message }}</div>
    <div class="ok" v-else>Compiled!</div>
    <div class="split">
      <div class="editorArea">
        <Editor
          class="editor"
          v-model="frogCode"
          @parsed="onParsed"
          @error="onError"/>
      </div>
      <Frogger class="frogger" :controller="controller" />
    </div>
  </div>
</template>

<script>
import { interpret } from '@frograming/language';
import Editor from '@/components/Editor.vue';
import Frogger from '@/components/Frogger.vue';
import FroggerController from '@/classes/FroggerController';

export default {
  name: 'home',
  components: { Editor, Frogger },

  created () {
    const { controller } = this;
    controller.onTick(context => {
      const commands = interpret(this.executionTree, context);

      for (const command of commands) {
        controller.emit(command);
      }
    });
  },

  data: () => ({
    controller: new FroggerController(),
    currentError: null,
    frogCode: `moveDown();
moveUp();

loop (3) {
  if (isLogUp()) {
    moveUp();
  } else {
    moveLeft();
  }
}`,
    executionTree: [],
  }),

  methods: {
    JSONToString (obj, ind) {
      return JSON.stringify(obj, null, 4);
    },
    onParsed (executionTree) {
      this.controller.emit('reset');
      this.executionTree = executionTree;
      this.currentError = null;
    },
    onError (error) {
      this.controller.emit('reset');
      this.executionTree = [];
      this.currentError = error;
    },
  },
};
</script>

<style lang="scss" scoped>
.split {
  display: flex;
}

.editorArea {
  flex-basis: 50%;
}

.editor {
  min-height: 80vh;
}

.frogger {
  flex-basis: 50%;
}

.error, .ok {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.ok {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
</style>
