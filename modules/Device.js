const _ = require('underscore');
const config = require('../config.json').mqtt;
const MQTTClient = require('./modules/mqtt')

class Device {
    constructor(name) {
        this.name = name;
        this.data = null;
        this.topic = null;
        this.client = null;
        this.onFunc = async () => {};

        MQTTClient.on('message', (topic, message) => {
            // message is Buffer
            let data = JSON.parse(message.toString());
            // topic = topic.replace(`${config.root}/`, '');

            if(topic.startsWith(`${config.root}/${this.name}`)) {
                this.topic = topic;
                this.data = data;
                this.onFunc(data).then();
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
}

module.exports = Device;