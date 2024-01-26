const _ = require('underscore');
const config = require('../config.json').mqtt;
const MQTTClient = require('./mqtt')

class Device {
    constructor(name) {
        this.name = name;
        this.data = null;
        this.topic = null;
        this.client = null;
        this.onFunc = async () => {};

        MQTTClient.on('message', (topic, message) => {
            // message is Buffer
            let msg = message.toString();
            try {
                let data = JSON.parse(msg);
                if(topic.startsWith(`${config.root}/${this.name}`)) {
                    this.topic = topic;
                    this.data = data;
                    this.onFunc(data).then();
                }
            } catch (err) {
                console.error('[Device]', topic, msg, err.toString());
            }
        });

    }

    on(fn) {
        this.onFunc = fn;
    }

    publish(topic, value) {
        return MQTTClient.publish(
            `${config.root}/${this.name}/${topic}`,
            _.isString(value) ? value : JSON.stringify(value)
        );
    }

    set(value) {
        this.publish('set', value);
    }
}

module.exports = Device;