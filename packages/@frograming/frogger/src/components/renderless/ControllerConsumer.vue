<script>
import FrogController from '../../models/FrogController';

export default {
  props: {
    controller: {
      type: FrogController,
      required: true,
    },
  },

  beforeDestroy () {
    this.unsub();
  },

  data: () => ({
    unsub: () => {},
  }),

  watch: {
    controller: {
      immediate: true,
      handler (controller) {
        this.unsub();
        this.unsub = controller.subscribe(command => this.$emit('command', command));
      },
    },
  },

  render: () => null,
};
</script>