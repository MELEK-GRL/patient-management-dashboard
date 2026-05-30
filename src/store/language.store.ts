import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../language/en.json';
import tr from '../language/tr.json';

export type AppLanguage = 'tr' | 'en';

export const getInitialLanguage = (): AppLanguage =>
  localStorage.getItem('lang') === 'en' ? 'en' : 'tr';

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'tr',
});

const languageSlice = createSlice({
  name: 'language',

  initialState: {
    lang: getInitialLanguage(),
  },

  reducers: {
    setLanguage(
      state,
      action: PayloadAction<AppLanguage>,
    ) {
      state.lang = action.payload;
      localStorage.setItem('lang', action.payload);
      void i18n.changeLanguage(action.payload);
    },
  },
});

export { i18n };
export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
