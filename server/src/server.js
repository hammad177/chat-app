require("dotenv").config();
require("./database/Mongoose");
const express = require("express");
const cors = require("cors");
const { messageSocket } = require("./sockets/Messages");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 5000;

exports.socket = messageSocket(io);

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/Room"));
app.use("/api", require("./routes/Users"));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
