const removeAll = (xs, y) => xs.filter(x => x !== y);

export default class FroggerController {
  static #POSSIBLE_COMMANDS = [
    'moveDown',
    'moveUp',
    'moveLeft',
    'moveRight',
    'reset',
  ];

  #subscribers = [];

  subscribe (fn) {
    if (!this.#subscribers.includes(fn)) {
      this.#subscribers.push(fn);
    }
    return () => removeAll(this.#subscribers, fn);
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
