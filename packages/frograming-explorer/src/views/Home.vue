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
      <div class="executionTree code">{{ JSONToString(executionTree, 4) }}</div>
    </div>
    <Interpreter :executionTree="executionTree" />
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue';
import Interpreter from '@/components/Interpreter.vue';

export default {
  name: 'home',
  components: { Editor, Interpreter },

  data: () => ({
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
      this.executionTree = executionTree;
      this.currentError = null;
    },
    onError (error) {
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

.executionTree {
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
