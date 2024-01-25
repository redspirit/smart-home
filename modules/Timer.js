const ms = require('ms');

class Timer {
    #timer;
    #ms;
    #fn;
    #starFn;

    constructor(val) {
        this.#timer = null;
        this.#ms = ms(val);
        this.#fn = () => {};
        this.#starFn = () => {};
        this.isWaiting = false;
    }
    onEnd(fn) {
        this.#fn = fn;
    }
    onStart(fn) {
        this.#starFn = fn;
    }
    start() {
        if(this.isWaiting) return false;
        this.isWaiting = true;
        this.#timer = setTimeout(() => {
            this.isWaiting = false;
            this.#fn();
        }, this.#ms);
        this.#starFn();
    }
    stop() {
        this.isWaiting = false;
        if(this.#timer) {
            clearTimeout(this.#timer);
        }
    }
    end() {
        this.stop();
        if(this.#fn) this.#fn();
    }
}

module.exports = Timer;