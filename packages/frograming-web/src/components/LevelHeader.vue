<template>
  <header>
    <section class="description">
      <slot />
    </section>
    <FadeTransition>
      <NextLevelButton v-if="showNext"/>
    </FadeTransition>
  </header>
</template>

<script>
import NextLevelButton from '@/components/NextLevelButton.vue';

export default {
  props: {
    showNext: {
      type: Boolean,
      default: false,
    },
  },

  components: { NextLevelButton },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: flex-start;

  .description {
    flex-grow: 1;
  }

  /deep/ h2 {
    margin: 0;
  }
}
</style>
