<template functional>
  <g :transform="`rotate(
       ${props.obstacle.velocity >= 0 ? 0 : 180},
       ${props.obstacle.pos.x + (props.obstacle.length / 2)},
       ${props.obstacle.pos.y + 0.5}
     )`">
    <rect :x="props.obstacle.pos.x"
          :y="props.obstacle.pos.y + 0.2"
          height="0.6"
          width="0.7"
          ry="0.2"
          rx="0.1"
          :fill="props.obstacle.color" />

    <rect :x="props.obstacle.pos.x + 0.5"
          :y="props.obstacle.pos.y + 0.3"
          height="0.4"
          width="0.7"
          ry="0.1"
          rx="0.1"
          fill="grey" />

    <rect :x="props.obstacle.pos.x + 0.75"
          :y="props.obstacle.pos.y + 0.2"
          height="0.6"
          :width="props.obstacle.length - 0.75"
          ry="0.1"
          rx="0.1"
          fill="grey" />

    <rect :x="props.obstacle.pos.x + 0.1"
          :y="props.obstacle.pos.y + 0.15"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          :fill="black" />

    <rect :x="props.obstacle.pos.x + 0.1"
          :y="props.obstacle.pos.y + 0.75"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          :fill="black" />

    <rect :x="props.obstacle.pos.x + 0.4"
          :y="props.obstacle.pos.y + 0.15"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          :fill="black" />

    <rect :x="props.obstacle.pos.x + 0.4"
          :y="props.obstacle.pos.y + 0.75"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          :fill="black" />

    <rect :x="props.obstacle.pos.x + props.obstacle.length - 0.35"
          :y="props.obstacle.pos.y + 0.15"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          :fill="black" />

    <rect :x="props.obstacle.pos.x + props.obstacle.length - 0.35"
          :y="props.obstacle.pos.y + 0.75"
          height="0.1"
          width="0.25"
          ry="0.4"
          rx="0.1"
          :fill="black" />

    <rect :x="props.obstacle.pos.x + 0.1"
          :y="props.obstacle.pos.y + 0.3"
          height="0.4"
          width="0.2"
          ry="0.1"
          rx="0.1"
          :fill="black" />
  </g>
</template>
