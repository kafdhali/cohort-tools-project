const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  linkedinUrl: {
    type: String,
    default: "",
  },
  languages: {
    type: String,
    enum: [
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Dutch",
      "Other",
    ],
  },

  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },

  cohort: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cohort",
  },

  projects: {
    type: [String],
  },
});

const Student = mongoose.model("Students", studentSchema);
module.exports = Student;
