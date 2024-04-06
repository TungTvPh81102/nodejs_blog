const express = require("express"); // Required thư viện dependencies trong package
const app = express(); // Hàm được xây dựng sẵn trong express
const port = 3000; // Cổng server

app.get("/", (req, res) => {
  var a = 1;
  var b = 2;
  var c = a + b;

  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
