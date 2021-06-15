module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        uid: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        refreshToken: {
            type: Sequelize.STRING
        }
    });

    return User;
};