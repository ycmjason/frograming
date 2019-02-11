<template functional>
  <rect :x="props.obstacle.pos.x"
        :y="props.obstacle.pos.y"
        :data-uid="props.obstacle.uid"
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

.log {
  fill: #a02828;
  rx: 0.1;
  ry: 0.5;
}
</style>
