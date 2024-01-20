const mqtt = require('mqtt');
const config = require('config.json');

const lobbyHandler = require('./modules/lobby');
const toiletHandler = require('./modules/toilet');

const client  = mqtt.connect(config.mqtt.url);

client.on('connect', () => {
    console.log('Mqtt connected ok!');
    client.subscribe(`${config.mqtt.root}/+`, (err) => {
        console.error('Mqtt connect', err)
    })
});

client.on('message', async (topic, message) => {
    // message is Buffer
    let data = JSON.parse(message.toString());
    topic = topic.replace(`${config.mqtt.root}/`, '');

    await lobbyHandler(client, topic, data); // прихожая
    await toiletHandler(client, topic, data); // туалет
});