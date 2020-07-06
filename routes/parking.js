var express = require('express');
const { parking_table } = require('../sequelize')
var router = express.Router();

/* GET users listing. */
router.get('/status', function(req, res, next) {
	let parkingId = req.query.parking_id;
	let parkingStatus = req.query.status; /* 1 ISI, 0 KOSONG */
	parking_table.findAll({
		where: {
			parking_id: parkingId
		}
	}).then(parking_table_find => {
		if (parking_table_find.length > 0) {
			parking_table.update({
				status: parkingStatus
			}, {
				where: {
					parking_id: parkingId
				}
			}).then(parking_table_update => {
				res.status(200).send({
					done: 'UPDATED',
					id: parkingId,
					status: parkingStatus
				});
			})
		} else {
			parking_table.create({
				parking_id: parkingId,
				status: parkingStatus
			}).then(parking_table_create => {
				res.status(201).send({
					done: 'CREATED',
					id: parkingId,
					status: parkingStatus
				});
			})
		}
	})
});

router.get('/all', function(req, res, next) {
	parking_table.findAll({
		order: [
            ['id', 'ASC']
        ]
	}).then(parking_table_all => {
		res.status(200).send(parking_table_all);
	})
})

router.get('/dashboard', function(req, res, next) {
	parking_table.findAll({
		order: [
            ['id', 'ASC']
        ]
	}).then(parking_table_all => {
		console.log(parking_table_all[0])
		res.render('parking_view', { 
			title: 'Express',
			parking: parking_table_all
		});
	})
});

module.exports = router;
