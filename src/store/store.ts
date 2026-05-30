import { configureStore } from '@reduxjs/toolkit';

import languageReducer from './language.store';
import patientReducer from './patient.store';

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
