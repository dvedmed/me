const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Spending = db.spending;
const Category = db.category;

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

exports.addSpending = async (req, res) => {
    console.log("-addSpending");
    console.log(req.body)

    let categoryList = req.body.categories;
    let spendingList = req.body.spending;

    let resultCategory = [];
    let resultSpending = [];

    await asyncForEach(categoryList, async (entry) => {
        console.log("start " + entry.name)
        await Category.create({
            name: entry.name,
            iconId: entry.iconId,
            color: 0,
            deviceId: entry.deviceId
        }).then(category => {
            let result = {
                deviceId: entry.deviceId,
                serverId: category.id
            }
            resultCategory.push(result);
            console.log("category created " + result + resultCategory.length)
        });
        console.log("finish " + entry.name)
    })

    await asyncForEach(spendingList, async (entry) => {
        console.log("start " + entry.name);
        await Spending.create({
            deviceId: entry.deviceId,
            name: entry.name,
            categoryId: entry.categoryId,
            date: entry.date,
            cost: entry.cost,
            description: entry.description
        }).then(spending => {
            let result = {
                deviceId: spending.deviceId,
                serverId: spending.id
            }
            resultSpending.push(result);
            console.log("spending created " + result + resultCategory.length)
        });
        console.log("finish " + entry.name);
    });

    res.status(200).send(JSON.stringify(
        { result: "success",
            resultCategory: resultCategory,
            resultSpending: resultSpending
        },null,'\t'));
};

exports.updateSpending = async (req, res) => {
    console.log("-updateSpending");
    console.log(req.body)

    let categoryList = req.body.categories;
    let spendingList = req.body.spending;

    let updateResultCategory = [];
    let updateResultSpending = [];

    await asyncForEach(categoryList, async (entry) => {
        console.log("start " + entry.name)

        await Category.update({
                name: entry.name,
                iconId: entry.iconId,
                color: 2,
                deviceId: entry.deviceId
            },
            { where: { id: entry.serverId } } )
            .then(category => {
                let result = {
                    deviceId: entry.deviceId,
                    status: "success"
                }
                updateResultCategory.push(result);
                console.log("category updated " + result + updateResultCategory.length)
            });

        console.log("finish " + entry.name)
    })

    await asyncForEach(spendingList, async (entry) => {
        console.log("start " + entry.name);
        await Spending.update({
                deviceId: entry.deviceId,
                name: entry.name,
                categoryId: entry.categoryId,
                date: entry.date,
                cost: entry.cost,
                description: entry.description
            },
            { where: { id: entry.serverId } }).then(spending => {//todo is update take result
            let result = {
                deviceId: entry.deviceId,
                status: "success"
            }
            updateResultSpending.push(result);
            console.log("spending update " + result + updateResultSpending.length)
        });
        console.log("finish " + entry.name);
    });

    res.status(200).send(JSON.stringify(
        { result: "success",
            resultCategory: updateResultCategory,
            resultSpending: updateResultSpending
        },null,'\t'));
};

async function createCategory(entry) {
    await Category.create({
        name: entry.name,
        iconId: entry.iconId,
        color: 0,
        deviceId: entry.deviceId
    })
        .then(category => {
            let result = {
                deviceId: entry.deviceId,
                serverId: category.id
            }
            console.log("category created " + result.toString())
            return result
        });
}


