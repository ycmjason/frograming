<template>
  <div class="container">
    <LevelHeader :showNext="showNext">
      <h2>Level 1</h2>
      <ul>
        <li>Type <span class="code">exec moveUp;</span> to move to the goal line.</li>
      </ul>
    </LevelHeader>
    <InterpretedFrogger class="frogger"/>
    <input v-model="input" placeholder="Type in exec statements." autofocus>
  </div>
</template>

<script>
import InterpretedFrogger from '@/components/InterpretedFrogger.vue';

export default {
  name: 'level1',
  components: { InterpretedFrogger },

  data: () => ({
    input: '',
  }),
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
}
</style>
