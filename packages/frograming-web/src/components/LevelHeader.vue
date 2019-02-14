<template>
  <header>
    <section class="description">
      <slot />
    </section>
    <FadeTransition>
      <NextLevelButton class="NextLevelButton" v-if="showNext"/>
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
@import '@/scss/config.scss';

header {
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: $breakpoint-md) {
    position: relative;
  }

  .description {
    flex-grow: 1;
  }

  /deep/ {
    h2:first-of-type {
      margin: 0;
    }

    h2, h3, h4, h5, h6 {
      text-align: center;
    }

    p, ul {
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    li {
      margin-bottom: 0.5rem;
    }
  }

}

.NextLevelButton {
  margin-bottom: 1rem;
  @media screen and (min-width: $breakpoint-md) {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
