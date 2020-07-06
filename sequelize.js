const Sequelize = require('sequelize')
const parkingModel = require('./models/parking_model')

var sequelize_db;

if (process.env.DATABASE_URL === undefined) {
	sequelize_db = new Sequelize('postgres', 'postgres', 'R@hasia', {
	  host: 'localhost',
	  dialect: 'postgres'
	});
} else {
	sequelize_db = new Sequelize(process.env.DATABASE_URL, {
	  dialectOptions: {
	    ssl: {
	      require: true,
	      rejectUnauthorized: false,
	    },
	    keepAlive: true,        
	  },      
	  ssl: true
	})
}


const parking_table = parkingModel(sequelize_db, Sequelize)

sequelize_db.sync()
  .then(() => {
    console.log(`Database & tables created!`)
    })

module.exports = {
    parking_table
}