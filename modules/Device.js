const _ = require('underscore');
const EventEmitter = require('events');
const config = require('../config.json').mqtt;
const MQTTClient = require('./mqtt')
const {isAsyncFunc} = require('../modules/utils')

const eventEmitter = new EventEmitter();

class Device {
    constructor(name) {
        this.name = name;
        this.data = null;
        this.onFunc = () => {};
        this.events = [];
        this.on = eventEmitter.on;

        MQTTClient.on('message', (topic, message) => {
            // message is Buffer
            let msg = message.toString();
            try {
                let data = JSON.parse(msg);
                if(topic.startsWith(`${config.root}/${this.name}`)) {
                    this.data = data;
                    if(this.onFunc) {
                        if(isAsyncFunc(this.onFunc)) {
                            this.onFunc(data).then();
                        } else {
                            this.onFunc(data);
                        }
                    }

                    _.each(this.events, e => {
                        if(!e.filterFn) return false;
                        let {condition, value} = e.filterFn(data);
                        if(condition) {
                            eventEmitter.emit(e.name, value || null);
                        }
                    });
                }
            } catch (err) {
                console.error('[Device]', topic, msg, err.toString());
            }
        });

    }

    registerEvent(name, filterFn) {
        this.events.push({
            name,
            filterFn
        })
    }

    onMessage(fn) {
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