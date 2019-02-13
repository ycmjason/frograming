<template>
  <div class="home container">
    <ParserMessage :error="currentError" />
    <div class="split">
      <div class="editorArea">
        <Editor class="editor" v-model="frogCode" />
      </div>
      <FrogrammableFrogger
          class="frogger"
          :frogCode="frogCode"
          @parsed="() => this.currentError = null"
          @error="err => this.currentError = err"/>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue';
import FrogrammableFrogger from '@/components/FrogrammableFrogger.vue';
import ParserMessage from '@/components/ParserMessage.vue';
import { stripIndent } from 'common-tags';

export default {
  name: 'level3',
  components: { Editor, FrogrammableFrogger, ParserMessage },

  data: () => ({
    currentError: null,
    frogCode: stripIndent`
      onTick {
        exec moveUp;
      }
    `,
  }),
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
</style>
