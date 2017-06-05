var express = require('express');
var router = express.Router();
var articlectrl = require('../controllers/articlectrl');

router.get('/', articlectrl.get)

router.post('/', articlectrl.create)

router.put('/:id', articlectrl.update)

router.delete('/:id', articlectrl.remove)

module.exports = router;
