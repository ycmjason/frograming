<template>
  <div tabindex="0"
    @click="uid++"
    @keydown.prevent.down.left.up.right
    @keydown.down="controller.emit('moveDown')"
    @keydown.up="controller.emit('moveUp')"
    @keydown.left="controller.emit('moveLeft')"
    @keydown.right="controller.emit('moveRight')"
    class="froggerSvgContainer">
    <Frogger :key="uid"
             :controller="controller"
             @gameStatus="$emit('gameStatus', $event)" />
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

<style scoped>
.froggerSvgContainer {
  height: 70vh;
}
</style>
