const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    /**
     * Create Spending
     */
    app.post(
        "/api/spending",
        [authJwt.verifyToken],
        controller.addSpending
    );

    /**
     * Edit Spending
     */
    app.put(
        "/api/spending",
        [authJwt.verifyToken],
        controller.updateSpending
    );
};