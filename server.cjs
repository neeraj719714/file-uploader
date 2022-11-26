const express = require("express");
const fs = require("fs");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// create an emty dir named "uploads" if not exists already
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.get("/get-files", (req, res) => {
  // read dir "uploads" and send the list of files
  fs.readdir("uploads", (err, files) => {
    setTimeout(() => {
      res.json(files);
    }, 1000);
  });
});

app.post("/upload-files", (req, res) => {
  // upload files to "uploads" dir
  upload.array("files")(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    res.json(req.files);
  });
});

app.get("/download-file/:fileName", (req, res) => {
  const { fileName } = req.params;
  res.download(`uploads/${fileName}`);
});

app.get("*", (req, res) => {
  // send Error response
  res.status(404).send("Not Found");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
