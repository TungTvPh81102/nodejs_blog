const path = require('path');
const express = require('express'); // Required thư viện dependencies trong package
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const app = express(); // Hàm được xây dựng sẵn trong express
const port = 3000; // Cổng server

// ROUTER
const route = require('./routes');

// Đường dẫn thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware lấy dữ liêu xử lý form được submit bằng phương thức POST
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// HTTP logger
app.use(morgan('combined')); // Kiểu logger tiêu chuẩn combined

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs', // config đuôi file .handlebars thành .hbs
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
