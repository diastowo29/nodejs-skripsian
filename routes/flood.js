var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/status', function(req, res, next) {
	let lampStatus = req.query.lamp_status;
	let lampId = req.query.lamp_id;
	let lampAmp = req.query.lamp_amp;
	res.status(200).send({
		id: lampId,
		status: lampStatus,
		amp: lampAmp
	});
});

module.exports = router;
