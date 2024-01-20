

const onMessage = async () => {

    if(topic === 'lobby_motion') {
        client.publish('zigbee2mqtt/mirror_light/set', data.occupancy ? 'ON' : 'OFF');
    }

}

module.exports = onMessage;