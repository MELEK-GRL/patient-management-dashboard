import {
    createSlice,
    type PayloadAction,
  } from '@reduxjs/toolkit';
  
  import type { Patient } from '../types/patient.types';
  
  const patientSlice = createSlice({
    name: 'patient',
  
    initialState: {
      patients: [] as Patient[],
    },
  
    reducers: {
      setPatients(
        state,
        action: PayloadAction<Patient[]>,
      ) {
        state.patients = action.payload;
      },
  
      addPatient(
        state,
        action: PayloadAction<Patient>,
      ) {
        state.patients.unshift(
          action.payload,
        );
      },
  
      updatePatient(
        state,
        action: PayloadAction<Patient>,
      ) {
        state.patients = state.patients.map(
          (patient) =>
            patient.id === action.payload.id
              ? action.payload
              : patient,
        );
      },
  
      deletePatient(
        state,
        action: PayloadAction<string>,
      ) {
        state.patients = state.patients.filter(
          (patient) =>
            patient.id !== action.payload,
        );
      },
    },
  });
  
  export const {
    setPatients,
    addPatient,
    updatePatient,
    deletePatient,
  } = patientSlice.actions;
  
  export default patientSlice.reducer;