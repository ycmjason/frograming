<script>
import DebugTicker from './DebugTicker.vue';
import IntervalTicker from './IntervalTicker.vue';

export default {
  functional: true,
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
  },
  render: (h, { props, data, children }) => {
    return h(props.debug? DebugTicker: IntervalTicker, data, children);
  },
};
</script>