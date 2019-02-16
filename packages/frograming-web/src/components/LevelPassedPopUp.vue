<template>
  <FadeTransition :duration="300">
    <div v-show="show" class="popupContainer" @click="$emit('close')">
      <div class="popupContainer_background">
        <!-- prefetching the image -->
        <img v-show="false" src="/fireworks.gif">
      </div>
      <section class="popup" @click.stop>
        <h3>Congratulations!</h3>
        <p>{{ message }}</p>

        <footer>
          <NextLevelButton v-if="hasNextLevel" />
          <button class="closeButton btn-plain" @click="close">close</button>
        </footer>
      </section>
    </div>
  </FadeTransition>
</template>

<script>
import NextLevelButton from './NextLevelButton.vue';

export default {
  components: { NextLevelButton },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
    hasNextLevel: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  methods: {
    close () {
      this.$ga.event('LevelPassedPopUp', 'close', `Level${this.$route.params.level}`);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  background: white;
  position: fixed;
  max-width: 800px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  padding: 1rem;
  z-index: 100;
}

.popupContainer_background {
  z-index: 99;
  content: '';
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-image: url("/fireworks.gif");
  background-size: cover;
  opacity: 0.8;
}

footer {
  display: flex;
  align-items: flex-end;

  .closeButton {
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
