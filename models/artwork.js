//artwork.js
var db = require("../db.js");

exports.create = function(data, done) {
  var values = [data.title, data.imgUrl, formatDateForMySQL(new Date())];

  db.get()
    .query(
      "INSERT INTO work (title, img_url, date_created) VALUES(?, ?, ?)",
      values,
      function(err, result) {
        if (err) return done(err);
        data["dateCreated"] = values[2];
        data["id"] = result.insertId;

        done(null, data);
      }
    );
};

exports.getAll = function(done) {
  db.get().query("SELECT * FROM work", function(err, rows) {
    if (err) return done(err);
    done(null, rows);
  });
};

exports.delete = function(id, done) {
  db.get().query("DELETE FROM work WHERE id = ?", [id], function(err, rows) {
    if (err) return done(err);
    done(null);
  });
};

function formatDateForMySQL(date) {
  let year = String(date.getFullYear());
  let day = String(date.getDay());
  let month = String(date.getMonth());
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}
