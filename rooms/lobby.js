
const moment = require('moment');
const Device = require('../modules/Device');

const lobbyMotion = new Device('lobby_motion');
const ledDriver = new Device('lobby_led_driver');

lobbyMotion.on(async (data) => {
    let hour = moment().hours();
    let isNight = hour > 22 || hour < 7;
    let brightness = isNight ? 40 : 254;

    console.log({isNight, brightness});

    let state = data.occupancy ? 'ON' : 'OFF';
    ledDriver.set({
        state,
        brightness
    });
});
