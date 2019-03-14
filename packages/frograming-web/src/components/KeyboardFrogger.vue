<template>
  <div>
    <div class="froggerControls">
      <button @click="restart">Restart</button>
    </div>
    <div tabindex="0"
         ref="keyboardArea"
         @keydown.prevent.down.left.up.right
         @keydown.down="controller.emit('moveDown')"
         @keydown.up="controller.emit('moveUp')"
         @keydown.left="controller.emit('moveLeft')"
         @keydown.right="controller.emit('moveRight')">
      <Frogger :key="uid"
               :controller="controller"
               @gameStatus="$emit('gameStatus', $event)" />
    </div>

    <div class="mobileControls">
      <button class="left" @click="controller.emit('moveLeft')">Left</button>
      <div class="up-down">
        <button class="up" @click="controller.emit('moveUp')">Up</button>
        <button class="down" @click="controller.emit('moveDown')">Down</button>
      </div>
      <button class="right" @click="controller.emit('moveRight')">Right</button>
    </div>
  </div>
</template>

<script>
import { Frogger, FrogController } from '@frograming/frogger';

export default {
  components: { Frogger },

  data: () => ({
    uid: 0,
    controller: new FrogController(),
  }),

  methods: {
    restart () {
      this.uid++;
      this.$refs.keyboardArea.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/config.scss';

.mobileControls {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  .up-down {
    display: flex;
    flex-direction: column;
  }

  .down {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-top: 0;
  }

  @media screen and (min-width: $breakpoint-md) {
    display: none;
  }
}
</style>
