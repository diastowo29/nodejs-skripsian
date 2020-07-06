var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/status', function(req, res, next) {
	let parkingId = req.query.parking_id;
	let parkingStatus = req.query.status;
	res.status(200).send({
		id: parkingId,
		voltage: parkingStatus
	});
});

module.exports = router;
