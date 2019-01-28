<template functional>
  <rect :x="props.obstacle.pos.x"
        :y="props.obstacle.pos.y"
        height="1"
        :width="props.obstacle.length"
        :fill="props.obstacle.color"
        :class="props.obstacle.type" />
</template>

<style scoped>
.car {
  rx: 0.1;
  ry: 0.5;
}
</style>
