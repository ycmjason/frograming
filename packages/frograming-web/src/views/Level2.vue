<template>
  <div class="container">
    <LevelHeader :showNext="false">
      <h2>Level 2</h2>
      <ul>
        <li>Write a "frogram" to win the game!</li>
      </ul>

      <FadeTransition>
        <div v-if="helpLevel >= 1">
          <h3>Tips:</h3>
          <ul>
            <li>You can use these commands: <code>exec moveUp;</code> / <code>exec moveRight;</code> / <code>exec moveDown;</code> / <code>exec moveLeft;</code> to move.</li>
            <li>You can use these predicates: <code>isGoalUp()</code> / <code> isRiverUp ()</code> / <code>is{Car|Log|Wall}{Up|Right|Down|Left}()</code>.</li>
            <template v-if="helpLevel >= 2">
              <li><!-- TODO: Add second level help --></li>
              <li><!-- TODO: Add second level help --></li>
              <li><!-- TODO: Add second level help --></li>
            </template>
            <template v-if="helpLevel >= 3">
              <li><!-- TODO: Add third level help --></li>
              <li><!-- TODO: Add third level help --></li>
              <li><!-- TODO: Add third level help --></li>
            </template>
          </ul>
        </div>
      </FadeTransition>
    </LevelHeader>

    <FrogrammableFrogger @gameStatus="$emit('gameStatus', $event)" />
  </div>
</template>

<script>
import LevelHeader from '@/components/LevelHeader.vue';
import FrogrammableFrogger from '@/components/FrogrammableFrogger.vue';

export default {
  name: 'level2',
  props: ['counts'],
  components: { LevelHeader, FrogrammableFrogger },

  computed: {
    helpLevel () {
      if (this.counts.lost >= 20) return 3;
      if (this.counts.lost >= 10) return 2;
      if (this.counts.lost >= 5) return 1;
      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
