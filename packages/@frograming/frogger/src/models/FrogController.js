export default class FrogController {
  static #POSSIBLE_COMMANDS = [
    'moveDown',
    'moveUp',
    'moveLeft',
    'moveRight',
    'NO_OP',
    'TERMINATED',
  ];

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
    if (!FrogController.#POSSIBLE_COMMANDS.includes(command)) {
      console.warn(`'${command}' is not a proper command.`);
      return;
    }

    for (const fn of this.#subscribers) {
      fn(command);
    }

    return this;
  }
}