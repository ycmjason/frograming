<template>
  <section>
    <div class="contextSwitchBoard">
      <label v-for="key in Object.keys(context)" :key="key">
        <input type="checkbox" v-model="context[key]">
        <span>{{ key }}</span>
      </label>
    </div>
    <div class="executionController">
      <Split>
        <div class="code">{{ JSONToString(context, 2) }} </div>
        <div class="code">{{ JSONToString(commands, 2) }}</div>
      </Split>
      <div @click="step" class="playButton" title="step"></div>
    </div>
  </section>
</template>

<script>
import { parse, interpret } from '@frograming/language';
import debounce from 'lodash.debounce';
import Split from '@/components/Split.vue';

const getDefaultContext = () => ({
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
});

export default {
  components: { Split },

  props: ['frogCode'],

  data: vm => ({
    playing: false,
    commands: [],
    context: getDefaultContext(),
  }),

  computed: {
    execution: vm => interpret(parse(vm.frogCode)),
  },

  methods: {
    JSONToString (obj, ind) {
      return JSON.stringify(obj, null, 4);
    },

    step () {
      this.commands.push(this.execution.step(this.context));
    },

    debouncedParse: debounce(function (code) {
      try {
        this.$emit('parsed', parse(code));
      } catch (e) {
        this.$emit('error', e);
      }
    }, 500),
  },
};
</script>

<style lang="scss" scoped>
.executionController {
  position: relative;

  .playButton {
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.playButton {
  --size: 1.3rem;
  cursor: pointer;
  box-sizing: content-box;
  padding: 0.3rem;
  width: var(--size);
  height: var(--size);
  border: 1px solid green;
  border-radius: 100%;
  background: white;

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-color: transparent transparent transparent green;
    border-style: solid;
    border-width: calc(var(--size) / 2);
    transform: scaleY(0.6) translate(33.33%);
  }
}

.contextSwitchBoard {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 1rem;

  label {
    color: #d2d20c;
    cursor: pointer;
    text-align: center;

    input {
      margin-right: 0.5rem;
    }

    input:checked ~ span {
      color: blue;
    }
  }
}
</style>
