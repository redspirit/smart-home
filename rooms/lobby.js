const moment = require('moment');
const Device = require('../modules/Device');
const Timer = require('../modules/Timer');

const lobbyMotion = new Device('lobby_motion_2');
const lobbyMotionOld = new Device('lobby_old_motion');
const ledDriver = new Device('lobby_led_driver');

let lightTimer = new Timer('30s'); // сколько горит свет при любой активности

let getBrightness = () => {
    let hour = moment().hours();
    let isNight = hour > 19 || hour < 7;
    return isNight ? 30 : 254;
};

const onFire = (data) => {
    if (data.occupancy) {
        ledDriver.set({
            state: 'ON',
            brightness: getBrightness(),
        });
        lightTimer.start(true);
    }
};

lightTimer.onEnd(() => {
    ledDriver.set({
        state: 'OFF',
        brightness: getBrightness(),
    });
});

lobbyMotion.onMessage(onFire);
lobbyMotionOld.onMessage(onFire);
