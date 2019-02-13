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

    <FrogrammableFrogger @gameStatus="$emit('gameStatus', $event)" />
  </div>
</template>

<script>
import LevelHeader from '@/components/LevelHeader.vue';
import FrogrammableFrogger from '@/components/FrogrammableFrogger.vue';

export default {
  name: 'level2',
  props: ['counts'],
  components: { LevelHeader, FrogrammableFrogger },
};
</script>

<style lang="scss" scoped>
</style>
