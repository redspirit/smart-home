
const Device = require('../modules/Device');

const lobbyMotion = new Device('lobby_motion');
const ledDriver = new Device('lobby_led_driver');

lobbyMotion.on(async (data) => {
    ledDriver.set({state: data.occupancy ? 'ON' : 'OFF'})
});
