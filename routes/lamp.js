var express = require('express');
const { lamp_table, volt_table } = require('../sequelize')
var router = express.Router();

/* GET users listing. */
router.get('/lamp', function(req, res, next) {
	let lamp_id = req.query.lamp_id;
	let lamp_current = req.query.lamp_current;
	lamp_table.findAll({
		where: {
			lamp_id: lamp_id
		}
	}).then(lamp_table_find => {
		if (lamp_table_find.length > 0) {
			lamp_table.update({
				lamp_current: lamp_current
			}, {
				where: {
					lamp_id: lamp_id
				}
			}).then(lamp_table_update => {
				res.status(200).send({
					done: 'UPDATED',
					lamp_id: lamp_id
				});
			})
		} else {
			lamp_table.create({
				lamp_id: lamp_id,
				lamp_current: lamp_current
			}).then(lamp_table_create => {
				res.status(201).send({
					done: 'CREATED',
					lamp: lamp_table_create
				});
			})
		}
	})
});

router.get('/volt', function(req, res, next) {
	let volt_id = req.query.volt_id;
	let volt = req.query.volt;
	volt_table.findAll({
		where: {
			volt_id: volt_id
		}
	}).then(volt_table_find => {
		if (volt_table_find.length > 0) {
			volt_table.update({
				volt: volt
			}, {
				where: {
					volt_id: volt_id
				}
			}).then(volt_table_update => {
				res.status(200).send({
					done: 'UPDATED',
					volt_id: volt_id
				});
			});
		} else {
			volt_table.create({
				volt_id: volt_id,
				volt: volt
			}).then(volt_table_create => {
				res.status(200).send({
					done: 'CREATED',
					volt: volt_table_create
				})
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
