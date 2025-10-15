import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { i18n } from '../../i18n';

// types
import { Performance, PerformanceFormData } from '../../module/types';

// hooks
import { useConfiguration } from '../../hooks/useConfiguration';

// schema
import { performanceSchema } from '../../module/schema';

// components
import { Input } from '../../components/Input/Input';
import { DatePicker } from '../../components/DatePicker/DatePicker';
import { Button } from '../../components/Button/Button';

// styles
import styles from './styles';

interface PerformanceFormProps {
  performance?: Performance;
  onSubmit: (data: PerformanceFormData) => { success: boolean; error: any };
  onCancel: () => void;
}

export const PerformanceForm: React.FC<PerformanceFormProps> = ({
  performance,
  onSubmit,
  onCancel,
}) => {
  const { getEnabledFields } = useConfiguration();
  const isEditing = !!performance;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PerformanceFormData>({
    resolver: zodResolver(performanceSchema.omit({ id: true })),
    defaultValues: performance || {
      title: '',
      date: new Date(),
      distance: undefined,
      duration: undefined,
      heartRate: undefined,
      notes: '',
    },
  });

  const enabledFields = getEnabledFields();

  const parseNumericInput = (text: string): number | null => {
    if (!text || text.trim() === '') return null;
    const value = parseFloat(text);
    return isNaN(value) ? null : value;
  };

  const parseIntegerInput = (text: string): number | null => {
    if (!text || text.trim() === '') return null;
    const value = parseInt(text, 10);
    return isNaN(value) ? null : value;
  };

  const handleFormSubmit = async (data: PerformanceFormData) => {
    const result = onSubmit(data);

    if (result.success) {
      Alert.alert(
        'Success',
        isEditing ? i18n.t('performanceUpdated') : i18n.t('performanceAdded'),
      );
    } else {
      Alert.alert('Error', 'Failed to save performance');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {isEditing ? i18n.t('editPerformance') : i18n.t('addPerformance')}
          </Text>
        </View>

        <View style={styles.form}>
          {enabledFields.title && (
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={i18n.t('title')}
                  value={value || ''}
                  onChangeText={onChange}
                  error={errors.title?.message}
                  placeholder="Enter performance title"
                />
              )}
            />
          )}

          {enabledFields.date && (
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label={i18n.t('date')}
                  value={value}
                  onChange={onChange}
                  error={errors.date?.message}
                />
              )}
            />
          )}

          {enabledFields.distance && (
            <Controller
              control={control}
              name="distance"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={i18n.t('distance')}
                  value={value?.toString() || ''}
                  onChangeText={text => onChange(parseNumericInput(text))}
                  error={errors.distance?.message}
                  placeholder="Enter distance in km"
                  keyboardType="numeric"
                />
              )}
            />
          )}

          {enabledFields.duration && (
            <Controller
              control={control}
              name="duration"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={i18n.t('duration')}
                  value={value?.toString() || ''}
                  onChangeText={text => onChange(parseNumericInput(text))}
                  error={errors.duration?.message}
                  placeholder="Enter duration in minutes"
                  keyboardType="numeric"
                />
              )}
            />
          )}

          {enabledFields.heartRate && (
            <Controller
              control={control}
              name="heartRate"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={i18n.t('heartRate')}
                  value={value?.toString() || ''}
                  onChangeText={text => onChange(parseIntegerInput(text))}
                  error={errors.heartRate?.message}
                  placeholder="Enter heart rate in bpm"
                  keyboardType="numeric"
                />
              )}
            />
          )}

          {enabledFields.notes && (
            <Controller
              control={control}
              name="notes"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={i18n.t('notes')}
                  value={value || ''}
                  onChangeText={onChange}
                  error={errors.notes?.message}
                  placeholder="Enter any additional notes"
                  multiline
                />
              )}
            />
          )}

          <View style={styles.buttons}>
            <Button
              title={i18n.t('cancel')}
              onPress={onCancel}
              variant="secondary"
            />
            <View style={styles.buttonSpacer} />
            <Button
              title={i18n.t('save')}
              onPress={handleSubmit(handleFormSubmit)}
              loading={isSubmitting}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
