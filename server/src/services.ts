import patientsData from "../db/patients";
import { diagnosesData } from "../db/diagnoses";

import { v1 as uuid } from "uuid";

import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  Patient,
  Diagnose,
  Gender,
  Entry,
} from "../types";

const getDiagnoseEntries = (): Diagnose[] => {
  return diagnosesData;
};

const getPatientsEntries = (): Patient[] => {
  const patients: Patient[] = patientsData.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => {
      let patientGender;
      if (gender === "male") patientGender = Gender.Male;
      else if (gender === "female") patientGender = Gender.Female;
      else patientGender = Gender.Other;
      return {
        id,
        name,
        dateOfBirth,
        ssn,
        gender: patientGender,
        occupation,
        entries: entries,
      };
    }
  );
  return patients;
};

const getNonSensitivePatientsEntries = (): NonSensitivePatientEntry[] => {
  return getPatientsEntries().map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientEntry): NewPatientEntry => {
  const id = uuid();
  let gen;
  switch (entry.gender) {
    case "male":
      gen = Gender.Male;
      break;
    case "female":
      gen = Gender.Female;
      break;
    default:
      gen = Gender.Other;
      break;
  }
  const newPatient : Patient = {
    id:id,
    name:entry.name,
    gender:gen,
    ssn:entry.ssn,
    dateOfBirth:entry.dateOfBirth,
    occupation:entry.occupation,
    entries:entry.entries
  }

  patientsData.push(newPatient);
  return newPatient;
};


const addEntry = (patientID:string , entry: Entry): void => {
  // patientsData.map((patient: Patient) => {
  //   if(patient.id === patientID){
  //     patient.entries.push(entry);
  //   }
  // })
  entry.id = uuid();
  console.log("HELLO" ,entry, patientID , "JUST SAYING");
  patientsData.forEach((patient : Patient) => {
    if(patient.id === patientID){
      patient.entries.push(entry);
    }
  });
};

export default {
  getPatientsEntries,
  getNonSensitivePatientsEntries,
  addPatient,
  addEntry,
  getDiagnoseEntries,
};
