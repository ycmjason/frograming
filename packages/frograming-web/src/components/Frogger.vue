<template>
  <div>
    <Frogger />
    {{ commands }}
  </div>
</template>

<script>
import FroggerController from '@/classes/FroggerController';
import Frogger from '@frograming/frogger';
console.log(Frogger);

export default {
  components: { Frogger },

  props: {
    controller: {
      type: FroggerController,
      required: true,
    },
  },

  created () {
    setInterval(() => this.onTick(), 1000);
    this.controller.subscribe(this.onCommand);
  },

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
    commands: [],
  }),

  methods: {
    onTick () {
      this.controller.tick(this.context);
    },

    onCommand (command) {
      if (command === 'reset') {
        this.commands = [];
      } else {
        this.commands.push(command);
      }
    },
  },
};
</script>
