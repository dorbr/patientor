import axios from "axios";
import React from "react";
import { Button } from "semantic-ui-react";
import AddEntryForm from "../AddEntryModal";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";

const PatientListPage = () => {
  const [state, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewEntry = async (values: unknown) => {
    try {
      const { data: entry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/:${state.patient ? state.patient.id : ""}/entries`,
        values
      );
      if(state.patient)
        dispatch({ type: "ADD_ENTRY", payload: [state.patient, entry] });
      closeModal();
    } catch (e: any) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };
  const [{ patient, diagnosisList }] = useStateValue();
  const entries: {
    entryDescription: string;
    diagnosis: Diagnosis[];
  }[] = [];
  let diagnosisArr: Diagnosis[] = [];
  if (patient) {
    patient.entries.forEach((entry) => {
      if (entry.diagnosisCodes) {
        entry.diagnosisCodes.forEach((diagnosisCode) => {
          diagnosisList.forEach((diagnosis) => {
            if (diagnosis.code === diagnosisCode) {
              diagnosisArr.push(diagnosis);
            }
          });
        });
      }
      entries.push({
        entryDescription: entry.description,
        diagnosis: diagnosisArr,
      });
      diagnosisArr = [];
    });
  }
  const element = (
    <div>
      {console.log(state)}
      <p>{patient ? patient.name : ""}</p>
      <p>{patient ? patient.gender : ""}</p>
      <p>{patient ? patient.occupation : ""}</p>
      <p>{patient ? patient.dateOfBirth : ""}</p>
      {entries.map((item) => {
        return (
          <div key={item.entryDescription}>
            <p>{item.entryDescription}</p>
            {item.diagnosis.map((i) => {
              return (
                <div key={i.name}>
                  <p>{i.code}</p>
                  <p>{i.name}</p>
                </div>
              );
            })}
          </div>
        );
      })}
      <p>{patient ? patient.ssn : ""}</p>{" "}
    </div>
  );
  return (
    <div className="App">
      <div>{element}</div>
      <AddEntryForm
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;
