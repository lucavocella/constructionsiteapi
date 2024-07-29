const {helloWorld} = require("../controllers/helloWorld.controller");
module.exports = app => {
    const helloWorld = require("../controllers/helloWorld.controller.js");

    var router = require("express").Router();

    // Hello World
    router.get("/", helloWorld.helloWorld);

    app.use("/api/helloworld", router);
};