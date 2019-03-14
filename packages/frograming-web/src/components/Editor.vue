<template>
  <codemirror
      ref="cm"
      data-gramm_editor="false"
      class="editor"
      :options="options"
      :value="value"
      @input="$emit('input', $event)" />
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';

import CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple.js';

CodeMirror.defineSimpleMode('frog', {
  // The start state contains the rules that are intially used
  start: [
    { regex: /(?:exec|onTick)\b/, token: 'def'},
    { regex: /(?:isGoalUp|isRiverUp|is(?:Car|Log|Wall)(?:Up|Right|Down|Left))\b/, token: 'variable-2'},
    { regex: /(?:!|&&|\|\|)/, token: 'operator'},
    { regex: /(?:if|else)\b/, token: 'keyword'},
    { regex: /true|false/, token: 'atom' },
    { regex: /(?:move(?:Up|Right|Down|Left))\b/, token: 'atom'},
    { regex: /[{(]/, indent: true },
    { regex: /[})]/, dedent: true },
  ],
});

export default {
  components: { codemirror },
  props: ['value'],
  data: () => ({
    options: {
      tabSize: 2,
      mode: 'frog',
      theme: 'solarized dark',
      lineNumbers: true,
      line: true,
    },
  }),

  methods: {
    focus () {
      this.$refs.cm.codemirror.focus();
    },
  },
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}

>>> .CodeMirror {
  height: 100%;
}
</style>
