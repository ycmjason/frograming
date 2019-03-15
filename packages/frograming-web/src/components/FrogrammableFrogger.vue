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
               :boardSettingSeed="seed"
               @tick="onTick"
               @gameStatus="$emit('gameStatus', $event)" />
      <div class="froggerControls">
        <button @click="restart(); focusEditor();">Restart</button>
        <div class="froggerControls_debug">
          <label>
            <input type="checkbox" v-model="debug"> Debug mode
          </label>
          <button :disabled="!debug" @click="debugController.tick()">Tick</button>
        </div>
        <div class="froggerControls_seed">
          <label>
            <input type="checkbox" v-model="isRandomSeed"> Random seed
          </label>
          <input
            :disabled="isRandomSeed"
            type="number"
            min="0"
            max="49"
            v-model="seed">
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

const getRandomSeed = () => Math.floor(Math.random() * 50);

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
    isRandomSeed: true,
    seed: getRandomSeed(),
  }),

  watch: {
    debug (debug) {
      this.$ga.event('FrogrammableFrogger', debug ? 'on' : 'off', 'debug');
    },
    execution () {
      if (!this.debug) {
        this.restart();
      }
    },

    frogCode: {
      immediate: true,
      handler: debounce(function () {
        try {
          const { frogCode } = this;
          this.ast = parse(frogCode);
          this.execution = interpret(this.ast);
          this.currentError = null;
        } catch (e) {
          this.ast = null;
          this.execution = interpret(null);
          this.currentError = e;
        }
        this.$emit('execution', this.execution);
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
      if (this.isRandomSeed) {
        this.seed = getRandomSeed();
      }
    },

    focusEditor () {
      this.$refs.editor.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/config.scss';

main {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 100%;
  grid-row-gap: 1rem;

  @media screen and (min-width: $breakpoint-md) {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, minmax(calc(50% - 1rem), 1fr));
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
  text-align: center;
  white-space: nowrap;
  overflow-x: auto;
  margin-bottom: 1rem;

  label {
    display: inline-flex;
    align-items: center;
  }

  &_debug {
    display: inline-block;
    margin-left: 1rem;

    label {
      margin-right: 10px;
    }
  }

  &_seed {
    display: inline-block;
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
