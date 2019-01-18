<template>
  <textarea :value="value" @input="onInput"></textarea>
</template>

<script>
import { parse } from '@frograming/language';
import debounce from 'lodash.debounce';

export default {
  props: ['value'],
  created () {
    this.$emit('parsed', parse(this.value));
  },
  methods: {
    onInput ($event) {
      this.$emit('input', $event.target.value);
      this.debouncedParse($event.target.value);
    },

    debouncedParse: debounce(function (code) {
      try {
        this.$emit('parsed', parse(code));
      } catch (e) {
        this.$emit('error', e);
      }
    }, 1000),
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100%;
  resize: none;
  padding: 1rem;
}
</style>
