<template>
  <div class="home container">
    <div class="error" v-if="currentError">{{ currentError.message }}</div>
    <div class="ok" v-else>Compiled!</div>
    <Split>
      <div class="editorArea">
        <Editor
          class="editor"
          v-model="frogCode" />
      </div>
      <Interpreter class="interpreter" :frogCode="frogCode" />
    </Split>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue';
import Interpreter from '@/components/Interpreter.vue';
import Split from '@/components/Split.vue';

export default {
  name: 'home',
  components: { Editor, Interpreter, Split },

  data: () => ({
    currentError: null,
    frogCode: `moveDown();
moveUp();

loop (3) {
  if (!isLogUp()) {
    moveUp();
  } else {
    moveLeft();
  }
}

wait isLogUp();
while (!isLogLeft()) {
  moveUp();
}`,
    AST: [],
  }),

  methods: {
    JSONToString (obj, ind) {
      return JSON.stringify(obj, null, 4);
    },
    onParsed (AST) {
      this.AST = AST;
      this.currentError = null;
    },
    onError (error) {
      this.AST = [];
      this.currentError = error;
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  min-height: 80vh;
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
