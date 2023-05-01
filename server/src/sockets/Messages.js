const MessageModel = require("../models/Messages");
const RoomModel = require("../models/Room");

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
        socket.to(room_code).emit("error", error?.message);
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
        socket.to(room_code).emit("error", error?.message);
      }
    });
    socket.on("delete-message", async ({ room_code, message_id }) => {
      try {
        const update = await MessageModel.updateOne(
          { room_code, _id: message_id },
          { $set: { is_deleted: true } }
        );
        if (update.matchedCount && update.modifiedCount) {
          socket.to(room_code).emit("message-deleted", { message_id });
        }
      } catch (error) {
        socket.to(room_code).emit("error", error?.message);
      }
    });
  });

  return io.of("/socket");
};
