const Cohort = require("../Models/Cohort.model");
const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      res.json(cohorts);
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to get list of Cohorts" });
    });
});
router.get("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findById(cohortId)
    .then((cohort) => res.json(cohort))
    .catch((err) => res.json({ code: 500, errorDetails: err }));
});
router.put("/cohorts/:cohortId", isAuthenticated, (req, res) => {
  const { cohortId } = req.params;
  const updatedDetails = req.body;

  Cohort.findByIdAndUpdate(cohortId, updatedDetails, { new: true })
    .then((cohort) => {
      res.status(201).json(cohort);
    })
    .catch((err) => res.json({ code: 500, errorDetails: err }));
});
router.post("/cohorts", isAuthenticated, (req, res) => {
  const cohortDetails = req.body;
  Cohort.create(cohortDetails)
    .then((cohort) => {
      console.log("Success");
      res.status(201).json(cohort);
    })
    .catch((err) => res.json({ code: 500, errorDetails: err }));
});

router.delete("/cohorts/:cohortId", isAuthenticated, (req, res, next) => {
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

module.exports = router;
