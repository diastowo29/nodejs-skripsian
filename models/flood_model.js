module.exports = (sequelize, type) => {
    return sequelize.define('flood', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        lamp_id: type.STRING(10),
        lamp_status: type.STRING(10),
        lamp_amp: type.STRING(10),
    })
}