const app = require("./app");
const http = require("http");

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

const io = require('socket.io')(server);
io.on('connection', function(socket){
  socket.on('new item', function(item){
    console.log("new item recieved")
    io.emit('new item', item);
  });
  socket.on('delete item', function(item){
    console.log("in server delete item function");
    io.emit('delete item', item);
  });
  socket.on('update item', function(item){
    console.log("in server delete item function");
    io.emit('update item', item);
  });
});
global.io = io;


server.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

server.on("listening", () => {
  console.log(`server is listening for requests on port ${server.address().port}`);
});
