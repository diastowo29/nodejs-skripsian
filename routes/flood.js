var express = require('express');
const { flood_table } = require('../sequelize')
var router = express.Router();

/* GET users listing. */
router.get('/status', function(req, res, next) {
	let lamp_id = req.query.lamp_id;
	let lamp_amp = req.query.lamp_amp;
	flood_table.findAll({
		where: {
			lamp_id: lamp_id
		}
	}).then(flood_table_find => {
		if (flood_table_find.length > 0) {
			flood_table.update({
				lamp_amp: lamp_amp
			},{
				where: {
					lamp_id: lamp_id
				}
			}).then(flood_table_update => {
				res.status(200).send(flood_table_find[0].dataValues.lamp_status);
			})
		} else {
			flood_table.create({
				lamp_id: lamp_id,
				lamp_amp: lamp_amp,
				lamp_status: '0'
			}).then(flood_table_create => {
				res.status(200).send(flood_table_create.lamp_status);
			});
		}
	})
});

router.get('/update', function(req, res, next) {
	let lamp_id = req.query.lamp_id;
	let lamp_status = req.query.lamp_status;
	flood_table.update({
		lamp_status: lamp_status
	},{
		where: {
			lamp_id: lamp_id
		}
	}).then(flood_table_update => {
		res.status(200).send({
			done: 'UPDATED'
		})
	})
})


router.get('/all', function(req, res, next) {
	flood_table.findAll().then(flood_table_all => {
		res.status(200).send(flood_table_all)
	})
})

router.get('/dashboard', function(req, res, next) {
	flood_table.findAll({
		order: [
            ['lamp_id', 'ASC']
        ]
	}).then(flood_table_all => {
		res.render('flood_view', {
			title: 'Express',
			flood: flood_table_all
		});
	})
})

module.exports = router;
