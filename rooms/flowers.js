const moment = require('moment');
const { onOff } = require('../modules/utils');
const Device = require('../modules/Device');

const rozetka = new Device('rozetka');

setInterval(() => {
    let hour = moment().hour();
    let isLightHours = hour >= 7 && hour < 22;
    rozetka.set({
        state: onOff(isLightHours),
    });
}, 60 * 1000);
