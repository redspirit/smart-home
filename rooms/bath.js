
const {onOff} = require('../modules/utils');
const Device = require('../modules/Device');
const Timer = require('../modules/Timer');

const motion = new Device('motion_bath');
const light = new Device('switch_bath');
const btn = new Device('btn_bath');

let timerShort = new Timer('8s');
let timerLong = new Timer('30m');

// датчик движения
motion.on(async (data) => {
    if (timerLong.isWaiting || timerShort.isWaiting) return false;
    light.set(onOff(data.occupancy));
});

// кнопка
btn.on(async () => {
    if(light.data.state === 'ON') {
        light.set('OFF');
        timerLong.stop();
        timerShort.start();
    } else {
        light.set('ON');
        timerShort.stop();
        timerLong.start();
    }
});

timerLong.onEnd(() => {
    light.set(onOff(motion.data.occupancy));
});