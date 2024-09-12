/* This file creates a static server that is used to run unit tests in the 
browser. Open the parent folder in the terminal and run the following command:
`node static-server.js`. The server will be running at http://localhost:8000/.
*/

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const port = 8000;

const MIME_TYPES = {
  html: "text/html",
  js: "text/javascript",
};

const STATIC_PATH = path.join(process.cwd(), "../../");

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("src/test/tests.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);