const Course = require("../models/Course.model");

module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // Students routes
  const studentRouter = require("./students.routes");
  app.use("/students", studentRouter);

  //Courde routes
  const courseRouter = require("./course.routes");
  app.use("/courses", courseRouter);


}
