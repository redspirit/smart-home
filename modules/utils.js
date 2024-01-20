const ms = require('ms');

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, ms(time)));
}

const isAsyncFunc = (fn) => {
   return fn.constructor.name === 'AsyncFunction';
}

module.exports = {
    sleep,
    isAsyncFunc,
}