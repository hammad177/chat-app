exports.messageSocket = (io) => {
  io.of("/socket").on("connection", (socket) => {
    socket.on("join-room", ({ room_code }) => {
      socket.join(room_code);
    });
    socket.on("send-message", ({ room_code, ...props }) => {
      socket.to(room_code).emit("receive-message", { ...props });
    });
  });
};
