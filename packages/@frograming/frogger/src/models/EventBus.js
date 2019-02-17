export default class EventBus {
  #subscribers = Object.create(null);

  on (topic, fn) {
    if (!Array.isArray(this.#subscribers[topic])) {
      this.#subscribers[topic] = [];
    }

    this.#subscribers[topic].push(fn);

    return () => {
      this.#subscribers[topic] = this.#subscribers[topic].filter(s => s !== fn);
    };
  }

  emit (topic, ...payloads) {
    if (!this.#subscribers[topic]) return;

    for (const fn of this.#subscribers[topic]) {
      fn(...payloads);
    }
  }
}
