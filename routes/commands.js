const express = require('express');
const keeneticApi = require('../modules/keeneticApi');
const router = express.Router();

router.post('/:action', async (req, res) => {
    let action = req.params.action;

    console.log('Incoming command:', action);

    if(action === 'vpn-on') {
        await keeneticApi.vpnEnable().then(() => {
            res.send('VPN включен!');
        }, (err) => {
            res.send('VPN уже включен');
        });
    } else if(action === 'vpn-off') {
        await keeneticApi.vpnDisable().then(() => {
            res.send('VPN выключен!');
        }, (err) => {
            res.send('VPN уже выключен');
        });
    } else {
        res.send({
            result: 'unknown_command'
        });
    }
});

module.exports = router
