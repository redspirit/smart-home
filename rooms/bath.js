
// const utils = require('../modules/utils');
const Device = require('../modules/Device');

const motion = new Device('motion_bath');
const light = new Device('switch_bath');
// const btn = new Device('btn_toilet');

let holdLight = false; // удерживание света игнорируя датчик движения

// датчик движения
motion.on(async (data) => {
    // if (holdLight) return false;
    console.log('Bath light', data);
    let value = data.occupancy ? 'ON' : 'OFF';
    light.set(value);
});
