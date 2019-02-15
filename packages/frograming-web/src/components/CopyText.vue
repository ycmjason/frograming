<template>
  <div class="inputWrapper">
    <input type="text" :value="text" readonly ref="input">
    <button :disabled="$attrs.disabled" @click="copy">{{ copied ? copiedText : copyText }}</button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    copyText: {
      type: String,
      default: 'copy',
    },
    copiedText: {
      type: String,
      default: 'copied',
    },
  },
  data: () => ({
    copied: false,
    timeoutId: null,
  }),
  methods: {
    copy () {
      this.$emit('copy');
      clearTimeout(this.timeoutId);
      this.$refs.input.select();
      document.execCommand('copy');
      this.copied = true;
      this.timeoutId = setTimeout(() => this.copied = false, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.inputWrapper {
  display: flex;
  flex-wrap: wrap;
}
input {
  flex-grow: 10;
}
button {
  flex-grow: 1;
}
</style>
