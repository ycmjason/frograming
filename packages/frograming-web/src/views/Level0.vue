<template>
  <div class="home container">
    <header>
      <section class="description">
        <h2>Level 0</h2>
        <ul>
          <li>Use <b>arrow keys</b> to bring the frog to the goal line.</li>
          <li v-if="showTips">Tips: click the game to restart.</li>
        </ul>
      </section>
      <section>
        <router-link tag="button" to="/levels/1">Next level</router-link>
      </section>
    </header>

    <KeyboardFrogger class="frogger" @gameStatus="onGameStatus"/>
  </div>
</template>

<script>
import KeyboardFrogger from '@/components/KeyboardFrogger.vue';

export default {
  name: 'level0',
  data: () => ({
    status: undefined,
    showTips: false,
  }),
  components: { KeyboardFrogger },
  methods: {
    onGameStatus (status) {
      if (status === 'lost') {
        this.showTips = true;
      }
      this.status = status;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;

  h2 {
    margin: 0;
  }

  .description {
    flex-grow: 1;
  }
}
</style>
