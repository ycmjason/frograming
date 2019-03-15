<template>
  <Modal :show="show" @close="close" bg-image="/fireworks.gif">
    <h3>Congratulations!</h3>
    <p>{{ message }}</p>
    <NextLevelButton slot="footer" v-if="hasNextLevel" />
  </Modal>
</template>

<script>
import NextLevelButton from './NextLevelButton.vue';
import Modal from './Modal.vue';

export default {
  components: { NextLevelButton, Modal },

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
