import { patientsData } from "../db/patients";
import { diagnosesData } from "../db/diagnoses";

import { v1 as uuid } from "uuid";

import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  Patient,
  Diagnose,
  Gender,
} from "../types";

const getDiagnoseEntries = (): Diagnose[] => {
  return diagnosesData;
};

const getPatientsEntries = (): Patient[] => {
  const patients = patientsData.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation }) => {
      let patientGender;
      if (gender === "male") patientGender = Gender.male;
      else if (gender === "female") patientGender = Gender.female;
      else patientGender = Gender.other;
      return {
        id,
        name,
        dateOfBirth,
        ssn,
        gender: patientGender,
        occupation,
      };
    }
  );
  return patients;
};

const getNonSensitivePatientsEntries = (): NonSensitivePatientEntry[] => {
  return getPatientsEntries().map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (entry: NewPatientEntry): NewPatientEntry => {
  const id = uuid();

  const newPatientEntry = {
    id: id,
    ...entry,
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientsEntries,
  getNonSensitivePatientsEntries,
  addPatient,
  getDiagnoseEntries,
};
