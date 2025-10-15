import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { format } from 'date-fns';
import { i18n } from '../../i18n';

// types
import { Performance } from '../../module/types';

// hooks
import { useConfiguration } from '../../hooks/useConfiguration';

// styles
import styles from './styles';

interface PerformanceListProps {
  performances: Performance[];
  onEdit: (performance: Performance) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export const PerformanceList: React.FC<PerformanceListProps> = ({
  performances,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const { getVisibleListFields } = useConfiguration();

  const handleDelete = (performance: Performance) => {
    Alert.alert(
      'Delete Performance',
      `Are you sure you want to delete "${performance.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(performance?.id),
        },
      ],
    );
  };

  const renderPerformanceItem = ({ item }: { item: Performance }) => {
    const visibleFields = getVisibleListFields();

    return (
      <TouchableOpacity style={styles.item} onPress={() => onEdit(item)}>
        <View style={styles.itemHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item)}
          >
            <Text style={styles.deleteText}>×</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.date}>{format(item.date, 'MMM dd, yyyy')}</Text>

        <View style={styles.metrics}>
          {visibleFields.includes('distance') &&
            item.distance !== undefined && (
              <Text style={styles.metric}>
                {i18n.t('distance')}: {item.distance} km
              </Text>
            )}
          {visibleFields.includes('duration') &&
            item.duration !== undefined && (
              <Text style={styles.metric}>
                {i18n.t('duration')}: {item.duration} min
              </Text>
            )}
          {visibleFields.includes('heartRate') &&
            item.heartRate !== undefined && (
              <Text style={styles.metric}>
                {i18n.t('heartRate')}: {item.heartRate} bpm
              </Text>
            )}
        </View>

        {visibleFields.includes('notes') && item.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {item.notes}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sports Performances</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {performances.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>{i18n.t('noPerformances')}</Text>
          <TouchableOpacity style={styles.emptyStateButton} onPress={onAdd}>
            <Text style={styles.emptyStateButtonText}>
              {i18n.t('addPerformance')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={performances}
          renderItem={renderPerformanceItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
