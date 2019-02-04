<script>
export default {
  mounted () {
    document.addEventListener('keypress', this.onKeyPress);
  },

  beforeDestroy () {
    document.removeEventListener('keypress', this.onKeyPress);
  },

  methods: {
    onKeyPress (e) {
      if (e.key !== ' ') return;
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

