const axios = require('axios');
const config = require('../config.json').keenetic;

const client = axios.create({
    baseURL: `http://${config.routerHost}/rci`,
});

const vpnEnable = () => {
    return client.post('/ip/hotspot/host', {
        mac: config.deviceMac,
        policy: config.vpnPolicy
    });
}

const vpnDisable = () => {
    return client.post('/ip/hotspot/host', {
        mac: config.deviceMac,
        policy: false
    });
}

module.exports = {
    vpnEnable,
    vpnDisable,
}