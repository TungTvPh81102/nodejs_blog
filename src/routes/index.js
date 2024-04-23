const newsRouter = require("./news");
const siteRouter = require("./site");
const courseRouter = require("./courses");
const meRouter = require("./me");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/courses", courseRouter);
  app.use("/me", meRouter);
  app.use("/", siteRouter);

  //   // Query parameters
  //   app.get("/search", (req, res) => {
  //     console.log(req.query.q); // lấy value được truyền qua URL thực hiện qua phương thức GET: req.query.q
  //     res.render("search");
  //   });

  //   // Form data
  //   app.post("/search", (req, res) => {
  //     console.log(req.body); // Lấy dữ liệu được gửi qua phương thức POST: req.body
  //     res.render("search");
  //   });
}

module.exports = route;
