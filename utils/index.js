const ms = require('ms');

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, ms(time)));
}

module.exports = {
    sleep,
}