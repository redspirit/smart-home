const ms = require('ms');

class Timer {
    #timer;
    #ms;
    #fn;
    #startFn;

    constructor(val) {
        this.#timer = null;
        this.#ms = ms(val);
        this.#fn = () => {};
        this.#startFn = () => {};
        this.isWaiting = false;
    }
    onEnd(fn) {
        this.#fn = fn;
    }
    onStart(fn) {
        this.#startFn = fn;
    }
    start(force = false) {
        // Если таймер уже запущен
        if (this.isWaiting) {
            if (!force) return false;
            this.stop();
        }
        this.isWaiting = true;
        this.#timer = setTimeout(() => {
            this.isWaiting = false;
            this.#fn();
        }, this.#ms);

        this.#startFn();
        return true;
    }
    stop() {
        this.isWaiting = false;
        if (this.#timer) {
            clearTimeout(this.#timer);
        }
    }
    end() {
        this.stop();
        if (this.#fn) this.#fn();
    }
}

module.exports = Timer;
