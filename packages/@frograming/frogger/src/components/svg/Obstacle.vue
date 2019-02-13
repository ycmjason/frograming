<template functional>
  <g :data-uid="props.obstacle.uid"
     :transform="`rotate(
       ${props.obstacle.velocity >= 0 ? 0 : 180},
       ${props.obstacle.pos.x + (props.obstacle.length / 2)},
       ${props.obstacle.pos.y + 0.5}
     )`">
    <component :is="props.obstacle.component" :obstacle="props.obstacle"/>
  </g>
</template>
