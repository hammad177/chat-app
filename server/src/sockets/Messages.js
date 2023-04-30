const MessageModel = require("../models/Messages");
const RoomModel = require("../models/Room");
const ResponseError = require("../libs");

exports.messageSocket = (io) => {
  io.of("/socket").on("connection", (socket) => {
    socket.on("join-room", ({ room_code }) => {
      socket.join(room_code);
    });
    socket.on("send-message", async ({ room_code, ...props }) => {
      try {
        await MessageModel.create({ room_code, ...props });
        socket.to(room_code).emit("receive-message", { ...props });
      } catch (error) {
        const { status, response } = ResponseError(error);
        res.status(status).json(response);
      }
    });
    socket.on("offline-user", async ({ room_code, user_id }) => {
      try {
        await RoomModel.updateOne(
          { room_code, "room_users.user_id": user_id },
          {
            $set: {
              "room_users.$.is_active": false,
            },
          }
        );
      } catch (error) {
        const { status, response } = ResponseError(error);
        res.status(status).json(response);
      }
    });
  });

  return io.of("/socket");
};
