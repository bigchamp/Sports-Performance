import { z } from 'zod';
import { performanceSchema } from './schema';

export type Performance = z.infer<typeof performanceSchema>;

export interface FieldConfig {
  enabled: boolean;
  required: boolean;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea';
  sortable?: boolean;
  visibleInList?: boolean;
}

export interface AppConfig {
  fields: {
    title: FieldConfig;
    date: FieldConfig;
    distance: FieldConfig;
    duration: FieldConfig;
    heartRate: FieldConfig;
    notes: FieldConfig;
  };
  listSortOrder: 'date' | 'title' | 'distance' | 'duration';
  listSortDirection: 'asc' | 'desc';
}

export type PerformanceFormData = Omit<Performance, 'id'>;
