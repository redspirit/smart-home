
require('console-stamp')(console, { format: ':date(dd/mm/yyyy HH:MM:ss) :label' });
const config = require('./config.json').mqtt;
const MQTTClient = require('./modules/mqtt')

MQTTClient.on('connect', () => {
    console.log('Mqtt connected ok!');
    MQTTClient.subscribe(`${config.root}/+`, (err) => {
        if(err)
            console.error('Mqtt connect', err)
    });

    // attach each room
    require('./rooms/lobby');
    require('./rooms/toilet');
    require('./rooms/bath');
});

console.log('Smart home started');