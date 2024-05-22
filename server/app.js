const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const Cohort = require("./Models/cohort.model");
const Student = require("./Models/students.model");
const mongoose = require("mongoose");

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

app.get("/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      res.json(cohorts);
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to get list of Cohorts" });
    });
});
app.get("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findById(cohortId)
    .then((cohort) => res.json(cohort))
    .catch((err) => res.json({ code: 500, errorDetails: err }));
});
app.put("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  const updatedDetails = req.body;

  Cohort.findByIdAndUpdate(cohortId, updatedDetails, { new: true })
    .then((cohort) => {
      res.status(201).json(cohort);
    })
    .catch((err) => res.json({ code: 500, errorDetails: err }));
});
app.post("/cohorts", (req, res) => {
  const cohortDetails = req.body;
  Cohort.create(cohortDetails)
    .then((cohort) => {
      console.log("Success");
      res.status(201).json(cohort);
    })
    .catch((err) => res.json({ code: 500, errorDetails: err }));
});

app.delete("/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndDelete(cohortId)
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((error) => {
      console.log("error deleting cohort", error);
      res.status(500).json({ error: "Failed to delete cohort" });
    });
});

app.get("/students", (req, res) => {
  Student.find()
    .populate("cohort")
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.log("Error getting Students from the DB", error);
      res.status(500).json({ error: "Failed to get list of Students" });
    });
});

app.get("/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .populate("cohort")
    .then((studentDB) => {
      res.json(studentDB);
    })
    .catch((error) => {
      console.log("Error getting Student details with id...", error);
      res.status(500).json({ error: "Failed getting students details" });
    });
});

app.get("/students/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Student.findById(cohortId)
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      console.log("Error getting students from cohorts", error);
      res.status(500).json({ error: "Failed to get students from cohorts id" });
    });
});

app.post("/students", (req, res, next) => {
  const studentsDetails = req.body;
  Student.create(studentsDetails)
    .then((student) => {
      console.log("Success");
      res.status(201).json(student);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to create a Student" });
    });
});

app.put("/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  const updatedDetails = req.body;
  Student.findByIdAndUpdate(studentId, updatedDetails, { new: true })
    .then((student) => {
      console.log("student:", student);
      res.json(student);
    })
    .catch((error) => {
      console.log("error couln't update student", error);
      res.status(500).json({ error: "Failed updating student" });
    });
});
app.delete("/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  Student.findbyIdAndDelete(studentId)
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      console.log("Error deleting student", error);
      res.status(500).json({ error: "Failed to delete Student" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
