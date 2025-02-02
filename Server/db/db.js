var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

var DB = DB || {};

DB.SqliteDB = function (file) {
    DB.db = new sqlite3.Database(file);

    DB.exist = fs.existsSync(file);
    if (!DB.exist) {
        console.log("[DB]正在创建db。。");
        fs.openSync(file, 'w');
    };
};

DB.printErrorInfo = function (err) {
    console.log("Error Message:" + err.message);
};

// DB.sortTable = function () {
//     var sql = "SELECT * FROM tiles ORDER BY score DESC";
//     DB.db.run(sql, function (err) {
//         if (null != err) {
//             DB.printErrorInfo(err);
//         }else{
//             console.log("[DB]排序成功");
//         }
//     });
// };


DB.SqliteDB.prototype.createTable = function (sql) {
    DB.db.serialize(function () {
        DB.db.run(sql, function (err) {
            if (null != err) {
                DB.printErrorInfo(err);
                return;
            } else {
                console.log('[DB]创建Table完成');
            }
        });
    });
};



/// tilesData format; [[level, column, row, content], [level, column, row, content]]
DB.SqliteDB.prototype.insertData = function (sql, objects) {
    DB.db.serialize(function () {
        var stmt = DB.db.prepare(sql);
        for (var i = 0; i < objects.length; ++i) {
            stmt.run(objects[i]);
        }
        stmt.finalize(function () {
            console.log('[DB]添加Data完成');
            // DB.sortTable();
        });
    });
};

DB.SqliteDB.prototype.queryData = function (sql, callback) {
    DB.db.all(sql, function (err, rows) {
        if (null != err) {
            DB.printErrorInfo(err);
            return;
        }

        /// deal query data.
        if (callback) {
            callback(rows);
            // DB.sortTable();
        }
    });
};

DB.SqliteDB.prototype.executeSql = function (sql) {
    DB.db.run(sql, function (err) {
        if (null != err) {
            DB.printErrorInfo(err);
        }
    });
};

DB.SqliteDB.prototype.close = function () {
    DB.db.close();
};

/// export SqliteDB.
exports.SqliteDB = DB.SqliteDB;
