const express = require('express');
const keeneticApi = require('../modules/keeneticApi');
const router = express.Router();

router.post('/:action', async (req, res) => {
    let action = req.params.action;

    console.log('Incoming command:', action);

    if(action === 'vpn-on') {
        await keeneticApi.vpnEnable().then(() => {
            console.log('VPN включен!');
            res.send('VPN включен!');
        }, (err) => {
            console.log('vpnEnable', err.toString());
            res.send('VPN уже включен');
        });
    } else if(action === 'vpn-off') {
        await keeneticApi.vpnDisable().then(() => {
            console.log('VPN выключен!');
            res.send('VPN выключен!');
        }, (err) => {
            console.log('vpnDisable', err.toString());
            res.send('VPN уже выключен');
        });
    } else {
        res.send({
            result: 'unknown_command'
        });
    }
});

module.exports = router
