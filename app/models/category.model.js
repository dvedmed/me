module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        deviceId: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.INTEGER
        },
        iconId: {
            type: Sequelize.INTEGER
        }
    });

    return Category;
};