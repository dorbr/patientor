import express from "express";
import { Entry } from "../../types";
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
router.get("/patients/:id", (req, res) => {
  const { id } = req.params;
  const patient = services
    .getNonSensitivePatientsEntries()
    .filter((item) => item.id === id);
  res.json(patient[0]);
});
router.post("/patients", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;
  const newPatientEntry = services.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
  });
  res.json(newPatientEntry);
});
router.post("/patients/:_id/entries", (req, res) => {
  const { _id } = req.params;
  const entry: Entry = req.body;
  let { id, date, diagnosisCodes, specialist, description } = entry;
  switch (entry.type) {
    case "HealthCheck":
      let { healthCheckRating } = entry;
      services.addEntry( _id , {
        id,
        date,
        type: entry.type,
        diagnosisCodes,
        specialist,
        description,
        healthCheckRating,
      });
      break;
    case "Hospital":
      let { discharge } = entry;
      services.addEntry(_id, {
        id,
        date,
        type: entry.type,
        diagnosisCodes,
        specialist,
        description,
        discharge,
      });
      break;
    case "OccupationalHealthcare":
      let { employerName, sickLeave } = entry;
      services.addEntry(_id, {
        id,
        date,
        type: entry.type,
        diagnosisCodes,
        specialist,
        description,
        employerName,
        sickLeave,
      });
      break;
  }
  // patientsData.forEach((patient) => {
  //   patient.entries.forEach(entry => {
  //     console.log(entry);
  //   });
  // });
  res.send(entry);
});

export default router;
