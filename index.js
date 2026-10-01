const http = require("node:http");
const fs = require("node:fs/promises");

const PORT = 8080;
const HOSTNAME = "localhost";
const PUBLIC_DIR = "./public";

const server = http.createServer(async (req, res) => {
  let { pathname } = new URL(req.url, `http://${HOSTNAME}`);

  switch (pathname) {
    case "/":
      pathname = "/index.html";
      break;
    case "/about":
      pathname = "/about.html";
      break;
    case "/contact-me":
      pathname = "/contact-me.html";
      break;
    default:
      pathname = "/404.html";
  }

  try {
    const data = await fs.readFile(PUBLIC_DIR + pathname);
    res.writeHead(200, { "Content-Type": "text/html" }).end(data);
  } catch {
    res.writeHead(404).end("Not found");
  }
});

server.listen(PORT, () => console.log(`Serving on http://${HOSTNAME}:${PORT}`));
