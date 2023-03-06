const routes = require("express").Router();
const UsersController = require("../controllers/Users");
const Auth = require("../middleware/Auth");

routes.post("/register", UsersController.signUp);
routes.post("/login", UsersController.login);
routes.post("/logout", Auth, UsersController.logout);

module.exports = routes;
