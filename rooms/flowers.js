const cron = require("node-cron");
const { onOff } = require("../modules/utils");
const Device = require("../modules/Device");

const rozetka = new Device("rozetka");

//с Пн по Пт включаем розетку в 8 утра
cron.schedule("0 8 * * 1-5", () => {
    console.log("Включаем розетку в 8 утра с Пн по Пт");
    rozetka.set({
        state: onOff(true),
    });
});

//с Сб и Вс включаем розетку в 9 утра
cron.schedule("0 9 * * 6-7", () => {
    console.log("Включаем розетку в 9 утра с Сб и Вс");
    rozetka.set({
        state: onOff(true),
    });
});

//с Пн по Вс выключаем розетку в 19:30 вечера
cron.schedule("30 19 * * *", () => {
    console.log("Выключаем розетку в 19:30 вечера с Пн по Вс");
    rozetka.set({
        state: onOff(false),
    });
});
