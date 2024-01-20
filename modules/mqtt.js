const mqtt = require('mqtt');
const config = require('config.json').mqtt;
const client = mqtt.connect(config.url);

module.exports = client;