module.exports = (sequelize, type) => {
    return sequelize.define('lamp', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        lamp_id: type.STRING(10),
        lamp_voltage: type.STRING(10),
        lamp_current: type.STRING(10),
    })
}