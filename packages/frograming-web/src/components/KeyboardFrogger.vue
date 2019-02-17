<template>
  <div>
    <div tabindex="0"
      @click="uid++"
      @keydown.prevent.down.left.up.right.enter
      @keydown.enter="uid++"
      @keydown.down="controller.emit('moveDown')"
      @keydown.up="controller.emit('moveUp')"
      @keydown.left="controller.emit('moveLeft')"
      @keydown.right="controller.emit('moveRight')"
      class="froggerSvgContainer">
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
};
</script>

<style lang="scss" scoped>
@import '@/scss/config.scss';

.froggerSvgContainer {
  height: 70vh;
}

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
