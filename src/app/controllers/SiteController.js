const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

// CONTRUCTORS
class SiteController {
  //  [GET] /
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        // courses = courses.map((course) => course.toObject());
        res.render("home", {
          courses: mutipleMongooseToObject(courses), // dữ liệu trên db được truyền qua trang home
        });
      })
      .catch(next);
  }

  //  [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
