<template functional>
  <g>
    <rect :x="props.obstacle.pos.x"
          :y="props.obstacle.pos.y + 0.15"
          height="0.7"
          :width="props.obstacle.length"
          fill="#a02828"
          rx="0.1"
          ry="0.4"
          :class="props.obstacle.type" />

    <rect :x="props.obstacle.pos.x"
          :y="props.obstacle.pos.y + 0.15"
          height="0.7"
          width="0.2"
          fill="#781414"
          rx="0.1"
          ry="0.4"
          :class="props.obstacle.type" />

    <path stroke="#781414"
          stroke-width="0.05"
          fill="none"
          :d="'M' + props.obstacle.pos.x + ',' + props.obstacle.pos.y + 'm0.3,0.33l0.1,0l0.1,0.1l0.1,-0.1l0.1,-0.1l0.1,0.1l0.1,0.05l0.2,-0.05l0.3,0.05'" />

    <path stroke="#781414"
          stroke-width="0.05"
          fill="none"
          :d="'M' + (props.obstacle.pos.x + props.obstacle.length) + ',' + props.obstacle.pos.y + 'm-0.3,0.4l-0.1,0l-0.2,0.2l-0.1,0.1l-0.3,-0.1l-0.1,-0.1l-0.1,0.1l-0.1,0.05l-0.2,-0.05l-0.3,0.05'" />
  </g>
</template>
