<script>
const Levels = [
  () => import(/* webpackChunkName: "level0" */'./Level0.vue'),
  () => import(/* webpackChunkName: "level1" */'./Level1.vue'),
  () => import(/* webpackChunkName: "level2" */'./Level2.vue'),
];

export default {
  functional: true,
  props: {
    level: Number,
  },
  render: (h, { props, data, children }) => h(Levels[props.level], data, children),
};
</script>
