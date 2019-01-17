<template>
  <div>
    <div class="contextSwitchBoard">
      <label v-for="key in Object.keys(context)" :key="key">
        <input type="checkbox" v-model="context[key]">
        <span>{{ key }}</span>
      </label>
    </div>
    <div class="split">
      <div class="code">{{ JSONToString(context, 2) }} </div>
      <div class="code">{{ JSONToString(commands, 2) }}</div>
    </div>
  </div>
</template>

<script>
import { interpret } from '@frograming/language';
export default {
  props: ['executionTree'],
  data: () => ({
    context: {
      isCarUp: false,
      isCarRight: false,
      isCarDown: false,
      isCarLeft: false,
      isLogUp: true,
      isLogRight: false,
      isLogDown: false,
      isLogLeft: false,
      isWallUp: false,
      isWallRight: false,
      isWallDown: false,
      isWallLeft: false,
    },
  }),
  computed: {
    commands () {
      return interpret(this.executionTree, this.context);
    },
  },
  methods: {
    JSONToString (obj, ind) {
      return JSON.stringify(obj, null, 4);
    },
  },
};
</script>

<style lang="scss" scoped>
.contextSwitchBoard {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  label {
    padding: 1rem;
    position: relative;
    color: #d2d20c;
    cursor: pointer;

    input {
      margin-right: 1rem;
    }

    input:checked ~ span {
      color: blue;
    }
  }
}

.split {
  display: flex;

  div {
    flex-basis: 50%;
  }
}
</style>
