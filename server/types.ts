export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}



export type NonSensitivePatientEntry = Omit<Patient, "ssn">;
export type NewPatientEntry = Pick<Patient, "name"| "dateOfBirth" | "ssn" | "occupation"> & {gender:string};



export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}