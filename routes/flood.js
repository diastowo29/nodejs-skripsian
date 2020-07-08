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

router.get('/dashboard', function(req, res, next) {
	res.render('flood_view', {
		title: 'Express'
	});
})

module.exports = router;
