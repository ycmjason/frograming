export default class FroggerController {
  static #POSSIBLE_COMMANDS = [
    'moveDown',
    'moveUp',
    'moveLeft',
    'moveRight',
    'NO_OP',
    'TERMINATED',
  ];

  static #COMMAND_DURATIONS = {
    moveDown: 10,
    moveUp: 10,
    moveLeft: 10,
    moveRight: 10,
    NO_OP: 1,
    TERMINATED: 0,
  };

  #subscribers = [];

  subscribe (fn) {
    if (!this.#subscribers.includes(fn)) {
      this.#subscribers.push(fn);
    }
    return () => {
      this.#subscribers = this.#subscribers.filter(s => s !== fn);
    };
  }

  emit (command) {
    if (!FroggerController.#POSSIBLE_COMMANDS.includes(command)) {
      console.warn(`'${command}' is not a proper command.`);
      return;
    }

    for (const fn of this.#subscribers) {
      fn(command);
    }

    return this;
  }
}