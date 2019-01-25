<script>
export default {
  props: {
    ticking: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 500,
    },
  },

  beforeDestroy () {
    clearInterval(this.id);
  },

  data: () => ({
    id: null,
  }),

  watch: {
    ticking: {
      immediate: true,
      handler (t) {
        if (t) {
          this.id = setInterval(() => this.$emit('tick'), this.interval);
        } else {
          clearInterval(this.id);
        }
      },
    },
  },

  render: h => null,
};
</script>
