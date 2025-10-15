import { AppConfig } from './types';

export const defaultConfig: AppConfig = {
  fields: {
    title: {
      enabled: true,
      required: true,
      label: 'title',
      type: 'text',
      sortable: true,
      visibleInList: true,
    },
    date: {
      enabled: true,
      required: true,
      label: 'date',
      type: 'date',
      sortable: true,
      visibleInList: true,
    },
    distance: {
      enabled: true,
      required: false,
      label: 'distance',
      type: 'number',
      sortable: true,
      visibleInList: true,
    },
    duration: {
      enabled: true,
      required: false,
      label: 'duration',
      type: 'number',
      sortable: true,
      visibleInList: true,
    },
    heartRate: {
      enabled: false,
      required: false,
      label: 'heartRate',
      type: 'number',
      sortable: false,
      visibleInList: false,
    },
    notes: {
      enabled: true,
      required: false,
      label: 'notes',
      type: 'textarea',
      sortable: false,
      visibleInList: false,
    },
  },
  listSortOrder: 'date',
  listSortDirection: 'desc',
};
