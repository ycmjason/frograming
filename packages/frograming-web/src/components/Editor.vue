<template>
  <textarea
      data-gramm_editor="false"
      :value="value"
      @input="$emit('input', $event.target.value)"></textarea>
</template>

<script>
export default {
  props: ['value'],
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
