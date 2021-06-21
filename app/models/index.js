const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        define: {
            timestamps: false
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Entries
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.spending = require("../models/spending.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model")(sequelize, Sequelize);

// Spending relation
db.user.hasMany(db.spending, {
    foreignKey: "spendingId"
});
db.spending.belongsTo(db.user, {
    foreignKey: "userId"
});

// Category relation
db.user.hasMany(db.category, {
    foreignKey: "categoryId"
});
db.category.belongsTo(db.user, {
    foreignKey: "userId"
});

module.exports = db;

//Test connection
/*const connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "Gc3rThDHrQ",
    database: "Gc3rThDHrQ",
    password: "uywXyNjTaG"
});

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});*/