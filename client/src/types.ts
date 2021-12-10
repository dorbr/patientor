export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry{
  type: 'OccupationalHealthcare',
  employerName: 'HyPD',
  sickLeave: {
    startDate: '2019-08-05',
    endDate: '2019-08-28',
  }
}
interface HospitalEntry extends BaseEntry{
  type: 'Hospital',
  discharge: {
    date: '2015-01-16',
    criteria: 'Thumb has healed.',
  },
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  export type EntryFormValues = Omit<BaseEntry, "id">;


export type PatientParams = {
  id: string;
};
