module.exports = (sequelize, type) => {
    return sequelize.define('parking', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        parking_id: type.STRING(10),
        status: type.STRING(10),
    })
}