const MessageModel = require("../models/Messages");
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
  });
};
