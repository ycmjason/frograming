<template>
  <div>
    <component
      :is="`Level${level}`"
      :counts="counts"
      @gameStatus="onGameStatus" />

    <LevelPassedPopUp
        :show="showLevelPassedPopup"
        @close="showLevelPassedPopup = false"
        :currentLevel="level"
        :hasNextLevel="level <= 1" />
  </div>
</template>

<script>
import Level0 from './Level0.vue';
import Level1 from './Level1.vue';
import Level2 from './Level2.vue';

import LevelPassedPopUp from '@/components/LevelPassedPopUp.vue';

export default {
  name: 'level',

  components: { Level0, Level1, Level2, LevelPassedPopUp },

  props: {
    level: Number,
  },

  watch: {
    level () {
      this.counts = { won: 0, lost: 0 };
      this.showLevelPassedPopup = false;
    },
  },

  data: () => ({
    counts: {
      won: 0,
      lost: 0,
    },
    showLevelPassedPopup: false,
  }),

  methods: {
    onGameStatus (status) {
      if (status === 'lost' || status === 'won') {
        this.counts[status] += 1;
      }

      if (status === 'won') {
        this.showLevelPassedPopup = true;
      }
    },
  },
};
</script>
