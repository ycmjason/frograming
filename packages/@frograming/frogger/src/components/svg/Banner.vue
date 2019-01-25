<template>
  <g v-bind="$attrs" v-on="$listeners">
    <rect :fill="color" width="100%" height="3" y="6"></rect>
    <text x="6.5" y="7" font-size="1" text-anchor="middle" alignment-baseline="hanging">
      {{ text }}
    </text>
  </g>
</template>

<script>
export default {
  props: ['text', 'color'],
};
</script>
