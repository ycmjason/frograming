<template>
  <main>
    <div class="editorArea">
      <ParserMessage :error="currentError" class="message" />
      <Editor class="editor" :value="frogCode" ref="editor" @input="$emit('input', $event)" />
    </div>

    <div class="froggerArea">
      <Frogger :key="uid"
               :controller="controller"
               :tickerController="debug ? debugController : undefined"
               @tick="onTick"
               @gameStatus="$emit('gameStatus', $event)" />
      <div class="froggerControls">
        <button @click="restart">Restart</button>
        <div class="froggerControls_debug">
          <label title="Control tick with SPACE">
            <input type="checkbox" v-model="debug"> Debug mode
          </label>
          <button v-if="debug" @click="debugController.tick()">Tick</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { parse, interpret } from '@frograming/language';
import { Frogger, FrogController, TickerController } from '@frograming/frogger';
import Editor from '@/components/Editor.vue';
import ParserMessage from '@/components/ParserMessage.vue';

import debounce from 'lodash.debounce';

export default {
  components: { Editor, ParserMessage, Frogger },

  model: { prop: 'frogCode', event: 'input' },

  props: ['frogCode'],

  data: () => ({
    uid: 0,
    currentError: null,
    controller: new FrogController(),
    ast: null,
    execution: interpret(null),
    debug: false,
    debugController: new TickerController(),
  }),

  watch: {
    debug (debug) {
      this.$ga.event('FrogrammableFrogger', debug ? 'on' : 'off', 'debug');
    },
    execution () {
      this.uid += 1;
    },

    frogCode: {
      immediate: true,
      handler: debounce(function () {
        try {
          const { frogCode } = this;
          this.ast = parse(frogCode);
          this.execution = interpret(this.ast);
          this.currentError = null;
          this.$emit('frogCode', frogCode);
        } catch (e) {
          this.ast = null;
          this.execution = interpret(null);
          this.currentError = e;
        }
      }, 500),
    },
  },

  methods: {
    onTick (context) {
      const { execution, controller } = this;
      const command = execution.tick(context);
      controller.emit(command);
    },

    restart () {
      this.uid++;
      console.log(this.$refs.editor);
      this.$refs.editor.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/config.scss';

main {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 1rem;

  @media screen and (min-width: $breakpoint-md) {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, minmax(50%, 1fr));
    grid-column-gap: 1rem;
  }
}

.editorArea {
  display: flex;
  flex-direction: column;
}

.editor {
  height: 70vh;
}

.froggerArea {
  display: flex;
  flex-direction: column;
  @media screen and (min-width: $breakpoint-md) {
    flex-direction: column-reverse;
  }
}

.froggerControls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  label {
    display: inline-flex;
    align-items: center;
  }

  &_debug {
    margin-left: 1rem;
    label {
      margin-right: 10px;
    }
  }
}

.message {
  margin-bottom: 1rem;
}
</style>
