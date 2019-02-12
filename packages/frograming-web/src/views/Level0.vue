<template>
  <div class="home container">
    <LevelHeader :showNext="showNext">
      <h2>Level 0</h2>
      <ul>
        <li>Use <b>arrow keys</b> to bring the frog to the goal line.</li>
        <FadeTransition>
          <li v-show="showTips">Tips: click the game to restart.</li>
        </FadeTransition>
      </ul>

      <FadeTransition>
        <div v-if="showTease">
          <h3>Well...</h3>
          <ul>
            <li>Since you have lost 5 times in a row, you can now to proceed to the next level.</li>
            <li>Or, do you wish to keep on trying?</li>
          </ul>
        </div>
      </FadeTransition>
    </LevelHeader>
    <KeyboardFrogger class="frogger" @gameStatus="onGameStatus"/>
  </div>
</template>

<script>
import KeyboardFrogger from '@/components/KeyboardFrogger.vue';
import LevelHeader from '@/components/LevelHeader.vue';

export default {
  name: 'level0',
  data: () => ({
    counter: {
      won: 0,
      lost: 0,
    },
  }),
  components: { LevelHeader, KeyboardFrogger },
  computed: {
    showNext () {
      return this.counter.won >= 1 || this.counter.lost >= 5;
    },
    showTips () {
      return this.counter.lost >= 1;
    },
    showTease () {
      return this.counter.lost >= 5 && this.counter.won <= 0;
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
