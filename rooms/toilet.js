
const {onOff, sleep} = require('../modules/utils');
const Device = require('../modules/Device');
const Timer = require('../modules/Timer');

const motion = new Device('motion_toilet');
const light = new Device('switch_toilet');
const btn = new Device('btn_toilet');

/*
Алгоритм работы с кнопкой
1) свет (light) включается при событии датчика (motion)
   если установлен флаг удержания то дальнейшие действия с датчика игнорируем
   если occupancy = true
    - включаем свет
   если occupancy = false
    - выключаем свет
2) нажимаем на кнопку (btn) кратковременное нажатие
   если свет уже горит:
    - выключаем свет
    - устанавливаем флаг удержания на 5 секунд
   если свет НЕ горит:
    - включаем свет
    - устанавливаем флаг удержания на 15 минут

*/

let timerShort = new Timer('5s');
let timerLong = new Timer('15m');

// датчик движения
motion.on(async (data) => {
    console.log('Bath motion', data.occupancy, timerLong.isWaiting, timerShort.isWaiting);
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

