<template>
  <div class="home container">
    <h2>Level 0</h2>
    <ul>
      <li>Use <b>arrow keys</b> to bring the frog to the goal line.</li>
    </ul>

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
