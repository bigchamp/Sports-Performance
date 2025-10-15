import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

// styles
import styles from './styles';

interface DatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(value);

  const handleConfirm = () => {
    onChange(tempDate);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setTempDate(value);
    setModalVisible(false);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[styles.dateButton, error && styles.inputError]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dateText}>{formatDate(value)}</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleCancel}
        onBackButtonPress={handleCancel}
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <View style={styles.modalContent}>
          {Platform.OS === 'ios' && (
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate) setTempDate(selectedDate);
              }}
            />
          )}

          {Platform.OS === 'android' && (
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) setTempDate(selectedDate);
              }}
            />
          )}

          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={handleCancel} />
            <Button title="Confirm" onPress={handleConfirm} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
