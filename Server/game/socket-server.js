var Socket = require("socket.io");
var path = require('path');
//sql init
var SqliteDB = require('../db/db').SqliteDB;

var file = path.join(__dirname, "../ranking.db");
var sqliteDB = new SqliteDB(file);
/// create table.
var createTileTableSql = "create table if not exists tiles(name TEXT, score INTEGER);";
sqliteDB.createTable(createTileTableSql);

var sql = "DELETE FROM tiles WHERE true;"
sqliteDB.executeSql(sql);

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
            console.log("[Server]收到结束游戏请求,name:" + data.name + ",score:" + data.score);
            var sql = "select * from tiles where name = '" + data["name"] + "'";
            sqliteDB.queryData(sql, function (getData) {
                if (!getData.length) {
                    var insertTileSql = "insert into tiles(name, score) values(?, ?)";
                    var tileData = [[data["name"], data["score"]]];
                    sqliteDB.insertData(insertTileSql, tileData);
                    return;
                }
                if (getData.length && getData[0].score < data.score) {
                    var updateSql = "update tiles set score=" + data.score + "where name=" + data.name;
                    sqliteDB.updateSql(updateSql);
                }
            });
        });
    });
    return that;
}
module.exports = SocketServer;
