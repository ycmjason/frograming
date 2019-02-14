<template>
  <div class="froggerSvgContainer">
    <Frogger />
  </div>
</template>

<script>
import { Frogger } from '@frograming/frogger';

export default {
  components: { Frogger },
};
</script>

<style lang="scss" scoped>
.froggerSvgContainer {
  height: 70vh;
}
</style>
