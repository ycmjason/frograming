<script>
import TickerController from '../../models/TickerController';

export default {
  props: {
    tickerController: {
      type: TickerController,
      required: true,
    },
    ticking: {
      type: Boolean,
      default: true,
    },
  },

  watch: {
    tickerController: {
      immediate: true,
      handler (ctrl, oldCtrl) {
        if (oldCtrl) oldCtrl.destroy();
        ctrl.onTick(() => this.tick());
        ctrl.initiate();
      },
    },
  },

  beforeDestroy () {
    this.tickerController.destroy();
  },

  methods: {
    tick () {
      if (!this.ticking) return;
      this.$emit('tick');
    },
  },

  render: h => null,
};
</script>
