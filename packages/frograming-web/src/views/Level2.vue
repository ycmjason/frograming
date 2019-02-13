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

    <FrogrammableFrogger v-model="frogCode" @gameStatus="$emit('gameStatus', $event)" />

    <div class="share">
      <h3>Share your code with your friend!</h3>
      <CopyText :text="frogCodeLink" />
    </div>
  </div>
</template>

<script>
import { stripIndent } from 'common-tags';

import CopyText from '@/components/CopyText.vue';
import LevelHeader from '@/components/LevelHeader.vue';
import FrogrammableFrogger from '@/components/FrogrammableFrogger.vue';

const encode = window.btoa;
const decode = window.atob;

export default {
  name: 'level2',
  components: { CopyText, LevelHeader, FrogrammableFrogger },
  props: ['counts', 'c'],
  data: vm => ({
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
};
</script>

<style lang="scss" scoped>
.share {
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
}
</style>
