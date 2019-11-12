var Socket = require("socket.io");
var path = require('path');
//sql init
var SqliteDB = require('../db/db').SqliteDB;

var file = path.join(__dirname, "../ranking.db");
var sqliteDB = new SqliteDB(file);
/// create table.
var createTileTableSql = "create table if not exists tiles(name TEXT, score INTEGER);";
sqliteDB.createTable(createTileTableSql);

// var sql = "DELETE FROM tiles WHERE true;"
// sqliteDB.executeSql(sql);

const SocketServer = function (server) {
    var that = Socket(server);
    that.on("connection", function (socket) {
        console.log("[Server]收到一个连接");
        var _socket = socket;
        //监听获取排行榜信息
        _socket.on("get_rank", function () {
            console.log("[Server]收到排行榜请求");
            var sql = "select * from tiles";
            sqliteDB.queryData(sql, function (getData) {
                //返回排行榜信息
                if (getData && getData.length) {
                    _socket.emit("get_rank", getData);
                    console.log("[Server]发送排行榜：" + getData);
                }
            });
        });
        _socket.on('disconnect', function () {
            console.log("[Server]断开连接");
        });


        //监听前端发送成绩消息 data:{name:XX score:XX}
        socket.on("end_game", function (data) {
            console.log("[Server]收到结束游戏请求,name:" + data.name + ",score:" + data.score);
            var sql = "select * from tiles where name = '" + data["name"] + "'";
            sqliteDB.queryData(sql, function (getData) {
                if (!getData.length) {
                    console.log("[Server]添加数据");
                    var insertTileSql = "insert into tiles(name, score) values(?, ?)";
                    var tileData = [[data["name"], data["score"]]];
                    sqliteDB.insertData(insertTileSql, tileData);
                    return;
                }
                if (getData.length && getData[0].score < data.score) {
                    console.log("[Server]更新数据");
                    var updateSql = "update tiles set score=" + data.score + " where name=" + data.name;
                    sqliteDB.executeSql(updateSql);
                }
            });
        });
    });
    return that;
}
module.exports = SocketServer;
