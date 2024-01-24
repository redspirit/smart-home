
const {onOff, sleep} = require('../modules/utils');
const Device = require('../modules/Device');

const motion = new Device('motion_bath');
const light = new Device('switch_bath');
const btn = new Device('btn_bath');

let hold = false;

// датчик движения
motion.on(async (data) => {
    if (hold) return false;
    light.set(onOff(data.occupancy));
});

// кнопка
btn.on(async (data) => {
    if(light.data.state === 'ON') {
        light.set('OFF');
        hold = true;
        await sleep('5s');
        hold = false;
    } else {
        light.set('ON');
        hold = true;
        await sleep('30m');
        hold = false;
    }
});