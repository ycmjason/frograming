import EventBus from './EventBus';

export default class FrogController {
  static #POSSIBLE_COMMANDS = [
    'moveDown',
    'moveUp',
    'moveLeft',
    'moveRight',
    'NO_OP',
    'TERMINATED',
  ];

  #eventBus = new EventBus();

  subscribe (fn) {
    return this.#eventBus.on('command', fn);
  }

  emit (command) {
    if (!FrogController.#POSSIBLE_COMMANDS.includes(command)) {
      console.warn(`'${command}' is not a proper command.`);
      return;
    }

    this.#eventBus.emit('command', command);

    return this;
  }
}
