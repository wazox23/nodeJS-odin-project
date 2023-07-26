const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filename = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  let extname = path.extname(filename);
  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/js";
      break;
    case ".css":
      contentType = "text/css";
      break;
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          if (err) throw err;
          res.writeHead(404, { "Content-Type": "text-html" });
          res.end(data);
        });
      } else {
        res.writeHead(500);
        res.end(err.code, "utf-8");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf-8");
    }
  });
});
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
