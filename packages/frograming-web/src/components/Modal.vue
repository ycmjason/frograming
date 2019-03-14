<template>
  <FadeTransition :duration="300">
    <div v-show="show" class="modalContainer" @click="$emit('close')">
      <div class="modalContainer__background" :style="bgStyle">
        <!-- prefetching the image -->
        <img v-if="bgImage" v-show="false" :src="bgImage">
      </div>
      <section class="modal" @click.stop>
        <slot></slot>

        <footer>
          <slot name="footer"></slot>
          <button class="closeButton btn-plain" @click="close">close</button>
        </footer>
      </section>
    </div>
  </FadeTransition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    bgImage: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '#000',
    },
  },

  computed: {
    bgStyle: vm => ({
      backgroundColor: vm.bgColor,
      backgroundImage: `url(${vm.bgImage})`,
    }),
  },

  methods: {
    close () {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.modalContainer {
  position: relative;
  z-index: 50;
}

.modal {
  background: white;
  position: fixed;
  max-width: 800px;
  max-height: 90vh;
  overflow: auto;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  padding: 1rem;
  z-index: 100;
}

.modalContainer__background {
  z-index: 99;
  content: '';
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-size: cover;
  opacity: 0.8;
}

footer {
  display: flex;
  align-items: flex-end;
  margin-top: 1rem;

  .closeButton {
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
