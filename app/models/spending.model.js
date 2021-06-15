module.exports = (sequelize, Sequelize) => {
    const Spending = sequelize.define("spending", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        deviceId: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        categoryId: {
            type: Sequelize.INTEGER
        },
        cost: {
            type: Sequelize.FLOAT
        }
    });

    return Spending;
};