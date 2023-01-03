const os = require('os');
const axios = require('axios');
const User = require('../models/user');

const checkDBHealth = async (req, res, next) => {
    try {
        const user = await User.findOne({});
        res.status(200).json({
            status: 'success', data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail', message: err.message
        });
    }
}

const checkHealth = async (req, res, next) => {
    res.status(200).json({
        status: 'success', message: 'API is running'
    });
}

const knowAZOfEC2 = async (req, res, next) => {
    try {
        const EC2_AVAIL_ZONE = await axios.get('http://169.254.169.254/latest/meta-data/placement/availability-zone');
        const hostname = os.hostname();
        res.send(`<h1>Hello World from ${hostname} in AZ ${EC2_AVAIL_ZONE.data} </h1>`);
    } catch (err) {
        res.status(500).json({
            status: 'fail', message: err.message, hostname: os.hostname()
        });
    }
}

module.exports = {
    checkDBHealth,
    checkHealth,
    knowAZOfEC2
}