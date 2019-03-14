<template>
  <div class="home container">
    <LevelHeader :showNext="showNext">
      <h2>Level 0</h2>
      <ul>
        <li>Use <b>arrow keys</b> to bring the frog to the goal line.</li>
      </ul>

      <FadeTransition>
        <div v-if="showTease">
          <h3>Well...</h3>
          <ul>
            <li>Since you have lost {{ counts.lost }} times in a row, maybe you want to learn some "frograming" to beat this game?</li>
            <li>Or, do you wish to keep on trying?</li>
          </ul>
        </div>
      </FadeTransition>
    </LevelHeader>

    <KeyboardFrogger class="frogger" @gameStatus="$emit('gameStatus', $event)"/>
  </div>
</template>

<script>
import LevelHeader from '@/components/LevelHeader.vue';
import KeyboardFrogger from '@/components/KeyboardFrogger.vue';

const LOST_COUNT_TO_SHOW_NEXT = 3;

export default {
  name: 'level0',

  components: { LevelHeader, KeyboardFrogger },

  props: ['counts'],

  computed: {
    showNext () {
      return this.counts.won >= 1 || this.counts.lost >= LOST_COUNT_TO_SHOW_NEXT;
    },
    showTips () {
      return this.counts.lost >= 1;
    },
    showTease () {
      return this.counts.lost >= LOST_COUNT_TO_SHOW_NEXT && this.counts.won <= 0;
    },
  },
};
</script>
