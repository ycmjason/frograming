<template>
  <div>
    <component
      :is="`Level${level}`"
      :counts="counts"
      v-bind="$attrs"
      v-on="$listeners"
      @gameStatus="onGameStatus" />

    <LevelPassedPopUp
        :show="showLevelPassedPopup"
        @close="showLevelPassedPopup = false"
        :currentLevel="level"
        :hasNextLevel="level <= 1"
        :message="message" />
  </div>
</template>

<script>
import Level0 from './Level0.vue';
import Level1 from './Level1.vue';
import Level2 from './Level2.vue';

import LevelPassedPopUp from '@/components/LevelPassedPopUp.vue';

const PASSING_MESSAGES = [
  'Congratulations! You have passed this level. You can proceed to the next level.',
  'Congratulations! You have passed this level. You can proceed to the next level.',
  'Congratulations! You have passed all the levels! You have beaten the Frogram game! Share your code with your friends!',
];

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

  computed: {
    message () {
      return PASSING_MESSAGES[this.level];
    },
  },

  methods: {
    onGameStatus (status) {
      if (status === 'lost' || status === 'won') {
        this.counts[status] += 1;
      }

      this.$ga.event(`Game Status`, status, `Level ${this.level}`, this.counts[status]);

      if (status === 'won') {
        this.showLevelPassedPopup = true;
      }
    },
  },
};
</script>
