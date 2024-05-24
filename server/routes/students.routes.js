const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");
const Student = require("../Models/students.model");

router.get("/students", (req, res) => {
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

router.get("/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .populate("cohort")
    .then((studentDB) => {
      res.status(200).json(studentDB);
    })
    .catch((error) => {
      console.log("Error getting Student details with id...", error);
      res.status(500).json({ error: "Failed getting students details" });
    });
});

router.get("/students/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      console.log("Error getting students from cohorts", error);
      res.status(500).json({ error: "Failed to get students from cohorts id" });
    });
});

router.post("/students", isAuthenticated, (req, res, next) => {
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

router.put("/students/:studentId", isAuthenticated, (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const updatedDetails = req.body;
  Student.findByIdAndUpdate(studentId, updatedDetails, { new: true })
    .then((updatedStudent) => {
      res.json(updatedStudent);
    })
    .catch((error) => {
      console.log("error couln't update student", error);
      res.status(500).json({ error: "Failed updating student" });
    });
});
router.delete("/students/:studentId", isAuthenticated, (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Student.findByIdAndDelete(studentId)
    .then(() => {
      res.json({ message: `Student with ${studentId} is deleted!` });
    })
    .catch((error) => {
      console.log("Error deleting student", error);
      res.status(500).json({ error: "Failed to delete Student" });
    });
});

module.exports = router;
