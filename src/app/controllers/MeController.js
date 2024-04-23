const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { request } = require("express");

// CONTRUCTORS
class MeController {
  //  [GET] /stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([
      courseQuery,
      Course.countDocumentsWithDeleted({ deleted: true }),
    ])
      .then(([course, deletedCount]) => {
        res.render("me/stored-courses", {
          deletedCount,
          course: mutipleMongooseToObject(course),
        });
      })
      .catch(next);
  }

  //  [GET] /trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((course) => {
        res.render("me/trash-courses", {
          course: mutipleMongooseToObject(course),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
