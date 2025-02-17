/* This file creates a static server that is used to run unit tests in the 
browser. Open the parent folder in the terminal and run the following command:
`node static-server.js`. The server will be running at http://localhost:8000/.
*/

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const port = 8000;

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const STATIC_PATH = path.join(process.cwd(), '');
const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith('/')) paths.push('tests/tests.html');
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  let ext, stream;

  if (found) {
    ext = path.extname(filePath).substring(1).toLowerCase();
    stream = fs.createReadStream(filePath);
  }

  return { found, ext, stream };
};

http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);

    if (file.found) {
      const statusCode = 200;
      const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
      res.writeHead(statusCode, { 'Content-Type': mimeType });
      file.stream.pipe(res);
      console.log(`${req.method} ${req.url} ${statusCode}`);
    }
    else {
      res.write('Resource not found!');
      res.end();
    }
  })
  .listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);
