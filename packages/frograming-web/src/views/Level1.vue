<template>
  <div class="container">
    <LevelHeader :showNext="showNext">
      <h2>Level 1</h2>
      <ul>
        <li>Use <code>exec moveUp;</code> / <code>exec moveRight;</code> / <code>exec moveDown;</code> / <code>exec moveLeft;</code> to move to the goal line.</li>
        <li>Hit Enter to submit.</li>
        <li>Use up / down arrow keys to go through command history.</li>
      </ul>
    </LevelHeader>
    <InterpretedFrogger class="frogger" @gameStatus="$emit('gameStatus', $event)"/>
  </div>
</template>

<script>
import InterpretedFrogger from '@/components/InterpretedFrogger.vue';
import LevelHeader from '@/components/LevelHeader.vue';

export default {
  name: 'level1',
  props: ['counts'],

  components: { InterpretedFrogger, LevelHeader },

  computed: {
    showNext () {
      return this.counts.won >= 1;
    },
  },
};
</script>
