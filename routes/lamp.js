var express = require('express');
const { lamp_table, volt_table } = require('../sequelize')
var router = express.Router();

/* GET users listing. */
router.get('/lamp', function(req, res, next) {
	let lamp_id = req.query.lamp_id;
	let lamp_current = req.query.current;
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

router.post('/update', function (req, res, next) {
	console.log(req.body)
	res.status(200).send(req.body);
});

router.get('/updateall', function (req, res, next) {

	for (var i=1; i<10; i++) {
		var currentParam = 'current_' + i;
		updateCurrent(i.toString(), req.query[currentParam]);
	}

	let volts = ['r', 's', 't']
	for (var i=0; i<volts.length; i++) {
		let voltParam = 'volt_' + volts[i];
		updateVolts(volts[i], req.query[voltParam]);
	}

	res.status(200).send(req.query);
});

router.get('/all', function(req, res, next) {
	lamp_table.findAll({
		order: [
            ['lamp_id', 'ASC']
        ]
	}).then(lamp_table_all => {
		res.status(200).send(lamp_table_all);
	});
});

router.get('/lamp/delete', function(req, res, next) {
	let id = req.query.id;
	lamp_table.destroy({
		where: {
			id: id
		}
	}).then(lamp_table_delete => {
		console.log('deleted')
	});
	res.status(200).send({});
});

router.get('/volt/all', function(req, res, next) {
	volt_table.findAll({
		order: [
            ['id', 'ASC']
        ]
	}).then(volt_table_all => {
		res.status(200).send(volt_table_all);
	})
})

router.get('/dashboard', function(req, res, next) {
	lamp_table.findAll({
		order: [
            ['lamp_id', 'ASC']
        ]
	}).then(lamp_table_all => {
		volt_table.findAll({
			order: [
	            ['id', 'ASC']
	        ]
		}).then(volt_table_all => {
			res.render('lamp_view', { 
				title: 'Ruang Panel A - Panel PP',
				lamp: lamp_table_all,
				volt: volt_table_all
			});
		})
	})
})

function updateCurrent (lamp_id, current) {
	lamp_table.findAll({
		where: {
			lamp_id: lamp_id
		}
	}).then(lamp_table_find => {
		if (lamp_table_find.length > 0) {
			lamp_table.update({
				lamp_current: current
			}, {
				where: {
					lamp_id: lamp_id
				}
			}).then(lamp_table_update => {
				console.log('UPDATED: ' + lamp_id);
			})
		} else {
			lamp_table.create({
				lamp_id: lamp_id,
				lamp_current: current
			}).then(lamp_table_create => {
				console.log('CREATED: ' + lamp_id);
			})
		}
	})
}

function updateVolts (volt_id, volt) {
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
				console.log('UPDATED: ' + volt_id)
			});
		} else {
			volt_table.create({
				volt_id: volt_id,
				volt: volt
			}).then(volt_table_create => {
				console.log('CREATED: ' + volt_id)
			})
		}
	})
}

module.exports = router;