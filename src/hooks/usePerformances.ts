import { useState, useCallback, useMemo } from 'react';

import { useConfiguration } from './useConfiguration';
import { Performance, PerformanceFormData } from '../module/types';
import { performanceSchema } from '../module/schema';

export const usePerformances = () => {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const { config } = useConfiguration();

  const addPerformance = useCallback((data: PerformanceFormData) => {
    const newPerformance: Performance = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };

    try {
      const validatedData = performanceSchema.parse(newPerformance);
      setPerformances(prev => [...prev, validatedData]);
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error };
    }
  }, []);

  const updatePerformance = useCallback(
    (id: string, data: PerformanceFormData) => {
      const updatedPerformance: Performance = {
        ...data,
        id,
      };

      try {
        const validatedData = performanceSchema.parse(updatedPerformance);
        setPerformances(prev =>
          prev.map(perf => (perf.id === id ? validatedData : perf)),
        );
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error };
      }
    },
    [],
  );

  const deletePerformance = useCallback((id: string) => {
    setPerformances(prev => prev.filter(perf => perf.id !== id));
  }, []);

  const getPerformance = useCallback(
    (id: string) => {
      return performances.find(perf => perf.id === id);
    },
    [performances],
  );

  const sortedPerformances = useMemo(() => {
    const sorted = [...performances];

    sorted.sort((a, b) => {
      const aValue = a[config.listSortOrder];
      const bValue = b[config.listSortOrder];

      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return config.listSortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return config.listSortDirection === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return config.listSortDirection === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });

    return sorted;
  }, [performances, config.listSortOrder, config.listSortDirection]);

  return {
    performances: sortedPerformances,
    addPerformance,
    updatePerformance,
    deletePerformance,
    getPerformance,
  };
};
