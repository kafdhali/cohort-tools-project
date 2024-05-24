const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

const mongoose = require("mongoose");
const studentRouter = require("./routes/students.routes");
const cohortRouter = require("./routes/cohort.routes");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
const cors = require("cors");
app.use(cors());

// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((response) => {
    console.log(`Connected! Database Name: "${response.connections[0].name}"`);
  })
  .catch((err) => console.error("Error connecting to DB", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
app.use("/auth", authRouter);
app.use("/api", studentRouter);
app.use("/api", cohortRouter);
app.use("/api", userRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
