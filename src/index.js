const path = require("path");
const express = require("express"); // Required thư viện dependencies trong package
const morgan = require("morgan");
const methodOverride = require("method-override"); // xử dụng thư viện của expressjs để tạo method cho form
const handlebars = require("express-handlebars").engine;
const SortMiddleware = require("./app/middleware/SortMiddware");

const app = express(); // Hàm được xây dựng sẵn trong express
const port = 3000; // Cổng server

// ROUTER
const route = require("./routes");

// DB
const db = require("./config/db");

// Connect to db
db.connect();

// Đường dẫn thư mục public
app.use(express.static(path.join(__dirname, "public")));

// Middleware lấy dữ liêu xử lý form được submit bằng phương thức POST
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(methodOverride("_method"));

// Custom middleware
app.use(SortMiddleware);

// HTTP logger
// app.use(morgan("combined")); // Kiểu logger tiêu chuẩn combined

// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs", // config đuôi file .handlebars thành .hbs
    helpers: {
      sum: (a, b) => a + b, // đánh chỉ số index cho bảng
      sortable: (field, sort) => {
        // render ra sort
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return ` <a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}"></span>
      </a>`;
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
