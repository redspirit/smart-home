
const {onOff, sleep} = require('../modules/utils');
const Device = require('../modules/Device');

const motion = new Device('motion_toilet');
const light = new Device('switch_toilet');
const btn = new Device('btn_toilet');

let holdLight = false; // удерживание света игнорируя датчик движения

// датчик движения
motion.on(async (data) => {
    if (holdLight) return false;
    light.set(onOff(data.occupancy));
});

// кнопка
btn.on(async (data) => {
    holdLight = !holdLight;
    if (holdLight) {
        light.set('ON');
        await sleep('15m'); // ждем N минут и отключаем свет
        holdLight = false;
        light.set(onOff(motion.data.occupancy));
    } else {
        light.set('OFF');
    }
});