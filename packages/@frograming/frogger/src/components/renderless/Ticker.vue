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
        if (oldCtrl) oldCtrl.offTick(this.tick);
        ctrl.onTick(this.tick);
      },
    },
  },

  beforeDestroy () {
    this.tickerController.offTick(this.tick);
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
