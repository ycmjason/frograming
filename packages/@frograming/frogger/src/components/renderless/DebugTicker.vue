<template>
  <button @click.stop="tick">Tick</button>
</template>

<script>
export default {
  methods: {
    tick () {
      this.$emit('tick');
    },
  },
};
</script>

