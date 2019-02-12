<template functional>
  <g transform="scale(1,1)">
    <rect :x="props.obstacle.pos.x"
          :y="props.obstacle.pos.y + 0.2"
          :data-uid="props.obstacle.uid"
          height="0.6"
          :width="props.obstacle.length"
          ry="0.2"
          rx="0.1"
          :fill="props.obstacle.color" />

    <rect :x="props.obstacle.pos.x + 0.1"
          :y="props.obstacle.pos.y + 0.15"
          :data-uid="props.obstacle.uid"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          fill="black" />

    <rect :x="props.obstacle.pos.x + 0.1"
          :y="props.obstacle.pos.y + 0.75"
          :data-uid="props.obstacle.uid"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          fill="black" />

    <rect :x="props.obstacle.pos.x + 0.65"
          :y="props.obstacle.pos.y + 0.15"
          :data-uid="props.obstacle.uid"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          fill="black" />

    <rect :x="props.obstacle.pos.x + 0.65"
          :y="props.obstacle.pos.y + 0.75"
          :data-uid="props.obstacle.uid"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          fill="black" />

    <rect :x="props.obstacle.pos.x + props.obstacle.length - 0.35"
          :y="props.obstacle.pos.y + 0.15"
          :data-uid="props.obstacle.uid"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          fill="black" />

    <rect :x="props.obstacle.pos.x + props.obstacle.length - 0.35"
          :y="props.obstacle.pos.y + 0.75"
          :data-uid="props.obstacle.uid"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          fill="black" />

    <rect :x="props.obstacle.pos.x + 0.2"
          :y="props.obstacle.pos.y + 0.3"
          :data-uid="props.obstacle.uid"
          height="0.4"
          width="0.2"
          ry="0.1"
          rx="0.1"
          fill="black" />

    <rect :x="props.obstacle.pos.x + props.obstacle.length - 0.3"
          :y="props.obstacle.pos.y + 0.3"
          :data-uid="props.obstacle.uid"
          height="0.4"
          width="0.2"
          ry="0.1"
          rx="0.1"
          fill="black" />
  </g>
</template>
