<template functional>
  <g v-bind="data.attrs" v-on="listeners">
    <rect :fill="props.color" width="100%" height="3" y="6"></rect>
    <text x="6.5" y="7" font-size="1" text-anchor="middle" dominant-baseline="hanging">
      {{ props.text }}
    </text>
  </g>
</template>
