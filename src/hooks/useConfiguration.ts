import { useState, useCallback } from 'react';
import { AppConfig, FieldConfig } from '../module/types';
import { defaultConfig } from '../module/config';

export const useConfiguration = () => {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);

  const updateFieldConfig = useCallback(
    (fieldName: keyof AppConfig['fields'], updates: Partial<FieldConfig>) => {
      setConfig(prev => ({
        ...prev,
        fields: {
          ...prev.fields,
          [fieldName]: {
            ...prev.fields[fieldName],
            ...updates,
          },
        },
      }));
    },
    [],
  );

  const updateSortOrder = useCallback(
    (sortOrder: AppConfig['listSortOrder']) => {
      setConfig(prev => ({
        ...prev,
        listSortOrder: sortOrder,
      }));
    },
    [],
  );

  const updateSortDirection = useCallback(
    (direction: AppConfig['listSortDirection']) => {
      setConfig(prev => ({
        ...prev,
        listSortDirection: direction,
      }));
    },
    [],
  );

  const getEnabledFields = useCallback(() => {
    return Object.entries(config.fields)
      .filter(([_, fieldConfig]) => fieldConfig.enabled)
      .reduce((acc, [fieldName, fieldConfig]) => {
        acc[fieldName as keyof AppConfig['fields']] = fieldConfig;
        return acc;
      }, {} as Partial<AppConfig['fields']>);
  }, [config.fields]);

  const getVisibleListFields = useCallback(() => {
    return Object.entries(config.fields)
      .filter(
        ([_, fieldConfig]) => fieldConfig.enabled && fieldConfig.visibleInList,
      )
      .map(([fieldName]) => fieldName as keyof AppConfig['fields']);
  }, [config.fields]);

  return {
    config,
    updateFieldConfig,
    updateSortOrder,
    updateSortDirection,
    getEnabledFields,
    getVisibleListFields,
  };
};
