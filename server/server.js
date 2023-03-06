require("dotenv").config();
require("./src/database/Mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api", require("./src/routes/Room"));
app.use("/api", require("./src/routes/Users"));

io.of("/socket").on("connection", (socket) => {
  // console.log(socket.id);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
