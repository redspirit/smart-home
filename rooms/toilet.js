
const {onOff, sleep} = require('../modules/utils');
const Device = require('../modules/Device');

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


let hold = false; // удерживание света игнорируя датчик движения

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
        await sleep('15m');
        hold = false;
    }
});