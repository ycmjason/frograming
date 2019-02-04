<script>
export default {
  props: {
    ticking: {
      type: Boolean,
      default: false,
    },
  },

  mounted () {
    document.addEventListener('keypress', this.onKeyPress);
  },

  beforeDestroy () {
    document.removeEventListener('keypress', this.onKeyPress);
  },

  methods: {
    onKeyPress (e) {
      if (e.key !== ' ') return;
      if (e.target !== document.body) return;
      if (!this.ticking) return;
      e.preventDefault();
      this.tick();
    },

    tick () {
      this.$emit('tick');
    },
  },

  render: () => null,
};
</script>

