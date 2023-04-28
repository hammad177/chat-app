const routes = require("express").Router();
const RoomControllers = require("../controllers/Room");
const Auth = require("../middleware/Auth");

routes.post("/create-room", Auth, RoomControllers.createRoom);
routes.post("/public-room", Auth, RoomControllers.publicRoom);
routes.post("/private-room", Auth, RoomControllers.privateRoom);
routes.post("/leave-room", Auth, RoomControllers.leaveRoom);
routes.get("/rooms", Auth, RoomControllers.geyAllRooms);
routes.get("/room-users/:room_id", Auth, RoomControllers.getRoomUsers);
routes.get("/room-messages/:room_code", Auth, RoomControllers.getRoomMessages);

module.exports = routes;
