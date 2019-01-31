<script>
import FroggerController from '../../models/FroggerController';

export default {
  props: {
    controller: {
      type: FroggerController,
      default: new FroggerController(),
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
