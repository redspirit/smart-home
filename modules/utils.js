const ms = require('ms');

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, ms(time)));
}

const isAsyncFunc = (fn) => {
   return fn.constructor.name === 'AsyncFunction';
}

const onOff = (value) => {
    return value ? 'ON' : 'OFF';
}

module.exports = {
    sleep,
    isAsyncFunc,
    onOff,
}