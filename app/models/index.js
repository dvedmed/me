const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        port: 3306,
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
/*
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });
    */

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
/*
const connection = mysql.createConnection({
    host: "188.225.33.101",
    user: "gen_user",
    database: "default_db",
    password: "jw2wszrng"
});

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});*/