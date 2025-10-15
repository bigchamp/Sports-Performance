export const translations = {
  en: {
    title: 'Title',
    date: 'Date',
    distance: 'Distance (km)',
    duration: 'Duration (min)',
    heartRate: 'Heart Rate (bpm)',
    notes: 'Notes',
    addPerformance: 'Add Performance',
    editPerformance: 'Edit Performance',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    noPerformances: 'No performances recorded yet',
    requiredField: 'This field is required',
    invalidNumber: 'Please enter a valid number',
    performanceAdded: 'Performance added successfully',
    performanceUpdated: 'Performance updated successfully',
  },
};

export type Language = 'en';
export type TranslationKey = keyof typeof translations.en;

let currentLanguage: Language = 'en';

export const i18n = {
  t: (key: TranslationKey): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  },
  setLanguage: (lang: Language) => {
    currentLanguage = lang;
  },
  getLanguage: (): Language => currentLanguage,
};
