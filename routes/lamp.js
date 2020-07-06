var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/status', function(req, res, next) {
	let lampId = req.query.lamp_id;
	let lampVoltage = req.query.voltage;
	let lampCurrent = req.query.current;
	res.status(200).send({
		id: lampId,
		voltage: lampVoltage,
		current: lampCurrent
	});
});

module.exports = router;
