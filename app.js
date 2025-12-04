const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    socket.on("Send-Location",function (data){
        io.emit("Receive-Location", {id: socket.id, ...data});
    });
    socket.on("disconnect", function(){
        io.emit("User-Disconnected", socket.id);
    });
});

app.get("/",  function(req, res){
  res.render("index");
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

 