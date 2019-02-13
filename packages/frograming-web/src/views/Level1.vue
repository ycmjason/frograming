<template>
  <div class="container">
    <LevelHeader :showNext="showNext">
      <h2>Level 1</h2>
      <ul>
        <li>Use <span class="code">exec moveUp;</span> / <span class="code">exec moveRight;</span> / <span class="code">exec moveDown;</span> / <span class="code">exec moveLeft;</span> to move to the goal line.</li>
        <li>Hit Enter to submit.</li>
      </ul>
    </LevelHeader>
    <InterpretedFrogger class="frogger" @gameStatus="onGameStatus"/>
  </div>
</template>

<script>
import InterpretedFrogger from '@/components/InterpretedFrogger.vue';
import LevelHeader from '@/components/LevelHeader.vue';

export default {
  name: 'level1',
  components: { InterpretedFrogger, LevelHeader },

  data: () => ({
    counter: {
      won: 0,
      lost: 0,
    },
  }),

  computed: {
    showNext () {
      return this.counter.won >= 1 || this.counter.lost >= 5;
    },
  },

  methods: {
    onGameStatus (status) {
      if (status === 'lost' || status === 'won') {
        this.counter[status] += 1;
      }
    },
  },
};
</script>
