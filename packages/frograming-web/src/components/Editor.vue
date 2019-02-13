<template>
  <codemirror
      data-gramm_editor="false"
      class="editor"
      :options="options"
      :value="value"
      @input="$emit('input', $event)" />
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css';

export default {
  components: { codemirror },
  props: ['value'],
  data: () => ({
    options: {
      tabSize: 4,
      mode: 'text/javascript',
      theme: 'base16-dark',
      lineNumbers: true,
      line: true,
    },
  }),
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>
