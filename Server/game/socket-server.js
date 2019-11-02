var Socket = require("socket.io");
var path = require('path');
//sql init
var SqliteDB = require('../db/db').SqliteDB;

const SocketServer = function (server) {
    var that = Socket(server);
    that.on("connection", function (socket) {
        console.log("[Server]收到一个连接");

        socket.on("get_rank", function (socket) {
            socket.emit("get_rank", { data_group: [1, 2, 3] });
            console.log("[Server]收到请求排行榜");
        });

        //data:{name:XX score:XX}
        socket.on("end_game", function (data) {
            recordScore(data);
            console.log("[Server]收到结束游戏请求,name:" + data.name + ",score:" + data.score);
        });
    });



    return that;
}
module.exports = SocketServer;


var file = path.join(__dirname, "../ranking.db");
var sqliteDB = new SqliteDB(file);
/// create table.
var createTileTableSql = "create table if not exists tiles(name TEXT, score INTEGER);";
sqliteDB.createTable(createTileTableSql);


function recordScore(data) {
    /// insert data.
    var tileData = [[data["name"], data["score"]]];
    var insertTileSql = "insert into tiles(name, score) values(?, ?)";
    sqliteDB.insertData(insertTileSql, tileData);
}