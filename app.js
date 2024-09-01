require('console-stamp')(console, { format: ':date(dd/mm/yyyy HH:MM:ss) :label' });
const config = require('./config.json');
const MQTTClient = require('./modules/mqtt')
const server = require('express')();
require('express-async-errors');

MQTTClient.on('connect', () => {
    console.log('Mqtt connected ok!');
    MQTTClient.subscribe(`${config.mqtt.root}/+`, (err) => {
        if(err)
            console.error('Mqtt connect', err)
    });

    // attach each room
    require('./rooms/lobby');
    require('./rooms/toilet');
    require('./rooms/bath');
});


server.use('/commands', require('./routes/commands'));

server.use((req, res) => {
    console.warn('Request not found', req.url)
    res.sendStatus(404);
});

server.use((err, req, res, next) => {
    console.error('Express Error', err);
    res.status(400).send({error: err.toString()});
});

server.listen(config.server.port, () => {
    console.log('Smart home started on', config.server.port);
})

