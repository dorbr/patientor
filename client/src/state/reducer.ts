import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "VIEW_PATIENT";
      payload: Patient;
    }
  | {
      type: "ALL_DIAGNOSIS";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: [Patient, Entry];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "VIEW_PATIENT":
      return {
        ...state,
        patient: action.payload,
      };
    case "ALL_DIAGNOSIS":
      return {
        ...state,
        diagnosisList: action.payload,
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patient:{
          id:action.payload[0].id,
          name:action.payload[0].name,
          gender:action.payload[0].gender,
          ssn:action.payload[0].ssn,
          occupation:action.payload[0].occupation,
          dateOfBirth:action.payload[0].dateOfBirth,
          entries:[...action.payload[0].entries, action.payload[1]]
        },
        patients: {
          ...state.patients,
          [action.payload[0].id]: {
            id:action.payload[0].id,
            name:action.payload[0].name,
            gender:action.payload[0].gender,
            ssn:action.payload[0].ssn,
            occupation:action.payload[0].occupation,
            dateOfBirth:action.payload[0].dateOfBirth,
            entries: [...action.payload[0].entries, action.payload[1]]
          }
        },
      };
    default:
      return state;
  }
};
