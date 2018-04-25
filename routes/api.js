// api.js
var express = require("express");
var artwork = require("../models/artwork");
var router = express.Router();

/* GET artworks. */
router
  .route("/work")
  .get(function(req, res, next) {
    let works = artwork.getAll((error, rows) => {
      if (error == null) {
        let works = rows.map(work => {
          return {
            id: work.id,
            title: work.title,
            imgUrl: work.img_url,
            category: work.category,
            dateCreated: work.date_created
          };
        });
        res.json(works);
      } else {
        console.log("there was an error getting works");
      }
    });
  })

  .post(function(req, res, next) {
    const artworkData = {
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      category: req.body.category,
      dateCreated: req.body.dateCreated
    };

    artwork.create(artworkData, function(err, values) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: "Artwork successfully added!",
          data: values
        });
      }
    });
  });

router
  .route("/work/:work_id")

  .delete(function(req, res) {
    artwork.delete(req.params.work_id, function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json({ message: "Artwork has been deleted" });
    });
  })
  .put(function(req, res, next) {
    const artworkData = {
      id: req.params.work_id,
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      category: req.body.category,
      dateCreated: req.body.dateCreated
    };
    artwork.update(artworkData, function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json({ message: "Artwork has been updated" });
    });
  });

module.exports = router;
