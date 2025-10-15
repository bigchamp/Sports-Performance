import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// types
import { Performance, PerformanceFormData } from './src/module/types';

// hooks
import { usePerformances } from './src/hooks/usePerformances';

// screens
import { PerformanceList } from './src/screens/PerformanceList/PerformanceList';
import { PerformanceForm } from './src/screens/PerformanceForm/PerformanceForm';

type Screen = 'list' | 'form';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('list');
  const [currentPerformance, setCurrentPerformance] = useState<
    Performance | undefined
  >();

  const { performances, addPerformance, updatePerformance, deletePerformance } =
    usePerformances();

  const handleAddPerformance = () => {
    setCurrentPerformance(undefined);
    setCurrentScreen('form');
  };

  const handleEditPerformance = (performance: Performance) => {
    setCurrentPerformance(performance);
    setCurrentScreen('form');
  };

  const handleSubmitPerformance = (data: PerformanceFormData) => {
    if (currentPerformance) {
      const result = updatePerformance(currentPerformance.id, data);
      if (result.success) setCurrentScreen('list');
      return result;
    } else {
      const result = addPerformance(data);
      if (result.success) setCurrentScreen('list');
      return result;
    }
  };

  const handleCancel = () => {
    setCurrentScreen('list');
    setCurrentPerformance(undefined);
  };

  const handleDeletePerformance = (id: string) => {
    deletePerformance(id);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {currentScreen === 'list' ? (
          <PerformanceList
            performances={performances}
            onEdit={handleEditPerformance}
            onDelete={handleDeletePerformance}
            onAdd={handleAddPerformance}
          />
        ) : (
          <PerformanceForm
            performance={currentPerformance}
            onSubmit={handleSubmitPerformance}
            onCancel={handleCancel}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
