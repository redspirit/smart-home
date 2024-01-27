
const {onOff} = require('../modules/utils');
const Device = require('../modules/Device');
const Timer = require('../modules/Timer');

const motion = new Device('motion_bath');
const light = new Device('switch_bath');
const btn = new Device('btn_bath');

btn.registerEvent('single', (data) => {
    return {
        condition: data.action === 'single',
        value: null
    };
});

let timerShort = new Timer('8s');
let timerLong = new Timer('30m');

// датчик движения
motion.onMessage((data) => {
    if (timerLong.isWaiting || timerShort.isWaiting) return false;
    light.set(onOff(data.occupancy));
});

// кнопка
btn.on('single', () => {
    if(light.data && light.data.state === 'ON') {
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