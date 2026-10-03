const express = require("express");
const app = express();

const PORT = 8080;
const HOSTNAME = "localhost";

app.use(express.static("public"));

// Default must be placed after other routes.
// They are checked sequentially
app.all("{*splat}", (req, res) => {
  console.log("404 triggered by:", req.method, req.originalUrl);
  res.status(404).sendFile("404.html", { root: "public" });
});

app.listen(PORT, (error) => {
  console.log(`Serving on http://${HOSTNAME}:${PORT}`);
  if (error) throw error;
});
