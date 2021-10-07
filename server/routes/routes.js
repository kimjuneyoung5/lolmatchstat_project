const User = require("../controllers/User.controller");

module.exports = (app) => {
    app.get("/api/users", User.findAll);
    app.get("/api/users/:id", User.findOne);
    app.post("/api/users", User.createUser);
    app.put("/api/users/:id", User.updateUser);
    app.delete("/api/users/:id", User.deleteUser);
}