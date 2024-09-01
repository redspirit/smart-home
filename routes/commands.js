const express = require('express');
const keeneticApi = require('../modules/keeneticApi');
const router = express.Router();

router.post('/:action', async (req, res) => {
    let action = req.params.action;

    console.log('Incoming command:', action);

    if(action === 'vpn-on') {
        await keeneticApi.vpnEnable();
        res.send({
            result: 'vpn_enabled'
        });
    } else if(action === 'vpn-off') {
        await keeneticApi.vpnDisable();
        res.send({
            result: 'vpn_disabled'
        });
    } else {
        res.send({
            result: 'unknown_command'
        });
    }
});

module.exports = router
