import EventBus from './EventBus';

export default class TickerController {
  #eventBus = new EventBus();

  initiate () { }

  destroy () { }

  tick () {
    this.#eventBus.emit('tick');
  }

  onTick (fn) {
    this.#eventBus.on('tick', fn);
  }
}

export class IntervalTickerController extends TickerController {
  constructor (interval) {
    super();
    this.interval = interval;
  }

  initiate () {
    this.intervalId = setInterval(() => this.tick(), this.interval);
  }

  destroy () {
    clearInterval(this.intervalId);
  }
}
