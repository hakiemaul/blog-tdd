var express = require('express');
var router = express.Router();
var userctrl = require('../controllers/userctrl');
var auth = require('../controllers/auth');

router.get('/', userctrl.get)

router.post('/', userctrl.create)

router.post('/login', auth.login)

router.put('/:id', userctrl.update)

router.delete('/:id', userctrl.remove)

module.exports = router;
