import EventBus from './EventBus';

export default class TickerController {
  #eventBus = new EventBus();

  tick () {
    this.#eventBus.emit('tick');
  }

  onTick (fn) {
    this.#eventBus.on('tick', fn);
    return () => this.offTick(fn);
  }

  offTick (fn) {
    this.#eventBus.off('tick', fn);
  }

  get subscribersCount () {
    return this.#eventBus.getSubscribersCount('tick');
  }
}

export class IntervalTickerController extends TickerController {
  intervalId = NaN;

  constructor (interval) {
    super();
    this.interval = interval;
  }

  onTick (fn) {
    super.onTick(fn);
    if (this.subscribersCount === 1) {
      this.intervalId = setInterval(() => {
        this.tick();
      }, this.interval);
    }
    return () => this.offTick(fn);
  }

  offTick (fn) {
    super.offTick(fn);
    if (this.subscribersCount <= 0) {
      clearInterval(this.intervalId);
    }
  }
}
