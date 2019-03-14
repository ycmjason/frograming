<template>
  <div class="container">
    <LevelHeader :showNext="false">
      <h2>Level 2</h2>
      <ul>
        <li>Write a "frogram" to win the game!</li>
        <li>Frogram is a program that controls the frog in the game.</li>
        <li>The program starts with <code>onTick { ... }</code>; the lines inside the curly braces will be executed every tick.</li>
      </ul>

      <FadeTransition>
        <div>
          <h3>Tips:</h3>
          <ul>
            <li>You can use these commands: <code>exec moveUp;</code> / <code>exec moveRight;</code> / <code>exec moveDown;</code> / <code>exec moveLeft;</code> to move.</li>
            <li>You can only <code>exec</code> once each tick.</li>
            <li>You can use <code>if ([predicate]) { ... }</code> statements.</li>
            <li>You can use <code>if ([predicate]) { ... } else { ... }</code> statements.</li>
            <li>You can use these predicates: <code>isGoalUp()</code> / <code>isRiverUp ()</code> / <code>is{Car|Log|Wall}{Up|Right|Down|Left}()</code>.</li>
            <li>Entering debug mode allow you to control the tick by hitting SPACE.</li>
          </ul>
        </div>
      </FadeTransition>
    </LevelHeader>

    <FrogrammableFrogger
      v-model="frogCode"
      @gameStatus="!testing && $emit('gameStatus', $event)"
      @execution="execution = $event" />

    <hr>

    <div class="cta_section test">
      <h3>The ultimate test suite</h3>
      <button @click="testing = true">Go to Test</button>

      <Modal :show="testing" @close="testing = false">
        <TestSuite v-if="testing" :execution="execution"/>
      </Modal>
    </div>

    <hr>

    <div class="cta_section share">
      <h3>Share your code with your friends!</h3>
      <GetDynamicLinkButton :key="frogCodeLink" :link="frogCodeLink" @copy="onCopy" />
    </div>
  </div>
</template>

<script>
import { stripIndent } from 'common-tags';
import debounce from 'lodash.debounce';

import GetDynamicLinkButton from '@/components/GetDynamicLinkButton.vue';
import LevelHeader from '@/components/LevelHeader.vue';
import FrogrammableFrogger from '@/components/FrogrammableFrogger.vue';
import TestSuite from '@/components/TestSuite.vue';
import Modal from '@/components/Modal.vue';

const encode = window.btoa;
const decode = window.atob;

export default {
  name: 'level2',
  components: {
    GetDynamicLinkButton,
    LevelHeader,
    FrogrammableFrogger,
    TestSuite,
    Modal,
  },
  props: ['counts', 'c'],
  data: vm => ({
    testing: false,
    execution: null,
    frogCode: vm.c ? decode(vm.c) : stripIndent`
      onTick {
        if (!isCarUp()) {
          exec moveUp;
        } else {
          exec moveLeft;
          exec moveRight;
        }
      }
    `,
  }),

  computed: {
    frogCodeLink () {
      const { frogCode } = this;
      const { protocol, host } = window.location;
      return `${protocol}//${host}/l/2?c=${encode(frogCode)}`;
    },
  },

  methods: {
    onCopy: debounce(function (link) {
      this.$ga.event('Share Link', 'copy', link);
    }, 500),
  },
};
</script>

<style lang="scss" scoped>
.cta_section {
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
}
</style>
