const axios = require('axios');
const config = require('../config.json').keenetic;

const client = axios.create({
    baseURL: `http://${config.routerHost}/rci`,
});

const vpnEnable = () => {
    return client.post('/ip/hotspot/host', {
        mac: config.deviceMac,
        policy: config.vpnPolicy
    }).then(r => r.data);
}

const vpnDisable = () => {
    return client.post('/ip/hotspot/host', {
        mac: config.deviceMac,
        policy: false
    }).then(r => r.data);
}

module.exports = {
    vpnEnable,
    vpnDisable,
}