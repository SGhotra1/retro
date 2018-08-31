const app = require("express")();
const http = require("http").Server(app);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>")
});

http.listen(8081, () => {
  console.log("Listening on port 8081");
});