<script>
export default {
  functional: true,
  render: (h, { children: [left, right] }) => {
    return h('div', { class: 'split' }, [left, right]);
  },
};
</script>

<style scoped>
.split {
  display: flex;

}

.split >>> > * {
  flex-basis: 50%;
}
</style>
