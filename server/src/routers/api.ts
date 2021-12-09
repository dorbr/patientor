import express from "express";
import services from "../services";

const router = express.Router();

router.get("/diagnoses", (_req, res) => {
  const diagnoses = services.getDiagnoseEntries();
  res.json(diagnoses);
});

router.get("/patients", (_req, res) => {
  const patients = services.getNonSensitivePatientsEntries();
  res.json(patients);
});
router.post("/patients", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = services.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatientEntry);
});

export default router;
