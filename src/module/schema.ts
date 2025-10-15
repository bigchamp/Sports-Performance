import { z } from 'zod';

const dateSchema = z
  .union([
    z.date(),
    z.string().datetime(),
    z.string().refine(val => !isNaN(Date.parse(val))),
    z
      .object({
        timestamp: z.number().optional(),
      })
      .transform(obj => new Date(obj.timestamp || Date.now())),
  ])
  .transform(val => {
    if (val instanceof Date) return val;
    if (typeof val === 'string') return new Date(val);
    if (val && typeof val === 'object' && 'timestamp' in val) {
      return new Date(val.timestamp || Date.now());
    }
    return new Date();
  });

const createPerformanceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  date: dateSchema,
  distance: z
    .union([
      z.number().min(0),
      z.string().transform(val => (val ? parseFloat(val) : undefined)),
    ])
    .optional(),
  duration: z
    .union([
      z.number().min(0),
      z.string().transform(val => (val ? parseFloat(val) : undefined)),
    ])
    .optional(),
  heartRate: z
    .union([
      z.number().min(0).max(300),
      z.string().transform(val => (val ? parseInt(val) : undefined)),
    ])
    .optional(),
  notes: z.string().optional(),
});

const performanceSchema = createPerformanceSchema.extend({
  id: z.string(),
});

export { performanceSchema, createPerformanceSchema };
export type PerformanceSchema = typeof performanceSchema;
