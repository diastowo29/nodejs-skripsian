module.exports = (sequelize, type) => {
    return sequelize.define('voltage', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        volt_id: type.STRING(10),
        volt: type.STRING(10)
    })
}