const http = require("http")
const fs = require("fs")
const path = require("path")

const port = 8080

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url)

  if (filePath.split(".").length === 1) {
    filePath += ".html"
  }

  const fileExt = String(path.extname(filePath)).toLowerCase()

  const mimeTypes = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "text/javascript"
  }

  const contentType = mimeTypes[fileExt] || "application/octet-stream"

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, "File not Found", {"content-type" : "text/html"})
        res.end(`404 : File not found `)
      }
    }
    else {
      res.writeHead(200, "Response OK", {"content-type": contentType})
      res.end(data, 'utf-8')
    }
  })
})

server.listen(port, () => {
  console.log(`Listening on port : ${port}`)
})
