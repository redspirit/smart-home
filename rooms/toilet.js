
const {onOff} = require('../modules/utils');
const Device = require('../modules/Device');
const Timer = require('../modules/Timer');

const motion = new Device('motion_toilet');
const light = new Device('switch_toilet');
const btn = new Device('btn_toilet');

btn.registerEvent('single', (data) => {
    return {
        condition: data.action === 'single',
        value: null
    };
});

let timerShort = new Timer('5s');
let timerLong = new Timer('15m');

// датчик движения
motion.onMessage((data) => {
    console.log('Bath motion', data.occupancy, timerLong.isWaiting, timerShort.isWaiting);
    if (timerLong.isWaiting || timerShort.isWaiting) return false;
    light.set(onOff(data.occupancy));
});

// кнопка
btn.on('single', () => {
    console.log('BTN Toilet single!');
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