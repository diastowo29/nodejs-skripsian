var express = require('express');
const { lamp_table } = require('../sequelize')
var router = express.Router();

/* GET users listing. */
router.get('/status', function(req, res, next) {
	let lampId = req.query.lamp_id;
	let lampVoltage = req.query.lamp_voltage;
	let lampCurrent = req.query.lamp_current;
	lamp_table.findAll({
		where: {
			lamp_id: lampId
		}
	}).then(lamp_table_find => {
		if (lamp_table_find.length > 0) {
			lamp_table.update({
				lamp_voltage: lampVoltage,
				lamp_current: lampCurrent
			}, {
				where: {
					lamp_id: lampId
				}
			}).then(lamp_table_update => {
				res.status(200).send({
					done: 'UPDATED',
					lamp_id: lamp_id
				});
			})
		} else {
			lamp_table.create({
				lamp_id: lampId,
				lamp_voltage: lampVoltage,
				lamp_current: lampCurrent
			}).then(lamp_table_create => {
				res.status(201).send({
					done: 'CREATED',
					lamp: lamp_table_create
				});
			})
		}
	})
});

router.get('/all', function(req, res, next) {
	lamp_table.findAll({
		order: [
            ['id', 'ASC']
        ]
	}).then(lamp_table_all => {
		res.status(200).send(lamp_table_all);
	})
})

router.get('/dashboard', function(req, res, next) {
	lamp_table.findAll({
		order: [
            ['id', 'ASC']
        ]
	}).then(lamp_table_all => {
		res.render('lamp_view', { 
			title: 'Express',
			lamp: lamp_table_all
		});
	})
})


module.exports = router;
