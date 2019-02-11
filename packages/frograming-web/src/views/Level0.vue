<template>
  <div class="home container">
    <KeyboardFrogger class="frogger" @gameStatus="onGameStatus"/>
  </div>
</template>

<script>
import KeyboardFrogger from '@/components/KeyboardFrogger.vue';

export default {
  name: 'level0',
  components: { KeyboardFrogger },
  methods: {
    onGameStatus (status) {
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
