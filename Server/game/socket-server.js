var Socket = require("socket.io");

const SocketServer = function (server) {
    var that = Socket(server);
    that.on("connection", function (socket) {
        console.log("[Server]收到一个连接");
    })
    that.on("connection", function (socket) {
        console.log("[Server]收到一个连接");
    })


    return that;
}
module.exports = SocketServer;