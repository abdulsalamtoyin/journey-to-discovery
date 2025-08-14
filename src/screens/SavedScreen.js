import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStudy } from '../context/StudyContext';

const SavedScreen = () => {
  const navigation = useNavigation();
  const { studies, savedStudies, getCategoryById, unsaveStudy } = useStudy();

  const savedStudiesData = studies.filter(study => savedStudies.includes(study.id));

  const handleStudyPress = (study) => {
    navigation.navigate('StudyDetail', { study });
  };

  const handleUnsaveStudy = (studyId) => {
    Alert.alert(
      'Remove from Saved',
      'Are you sure you want to remove this study from your saved list?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive', 
          onPress: () => unsaveStudy(studyId)
        },
      ]
    );
  };

  const renderStudyCard = (study) => {
    const category = getCategoryById(study.categoryId);
    
    return (
      <View key={study.id} style={styles.studyCard}>
        <TouchableOpacity
          style={styles.studyContent}
          onPress={() => handleStudyPress(study)}
        >
          <View style={styles.studyHeader}>
            <View style={styles.categoryBadge}>
              <View style={[styles.categoryDot, { backgroundColor: category?.color }]} />
              <Text style={styles.categoryText}>{category?.name}</Text>
            </View>
            <Text style={styles.studyDate}>
              {new Date(study.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.studyTitle}>{study.title}</Text>
          <Text style={styles.studyDescription} numberOfLines={2}>
            {study.description}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.studyActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleUnsaveStudy(study.id)}
          >
            <Ionicons name="bookmark" size={20} color="#4F46E5" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStudyPress(study)}
          >
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Studies</Text>
        <View style={styles.headerRight}>
          <Text style={styles.savedCount}>
            {savedStudiesData.length} saved
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {savedStudiesData.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
              <Ionicons name="bookmark-outline" size={64} color="#d1d5db" />
            </View>
            <Text style={styles.emptyStateTitle}>No saved studies yet</Text>
            <Text style={styles.emptyStateText}>
              Studies you save will appear here for easy access. Tap the bookmark icon on any study to save it.
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => navigation.navigate('Studies')}
            >
              <Text style={styles.browseButtonText}>Browse Studies</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.studiesList}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Your Saved Studies</Text>
              <Text style={styles.listSubtitle}>
                Tap and hold on the bookmark to remove from saved
              </Text>
            </View>
            {savedStudiesData.map(renderStudyCard)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  savedCount: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  studiesList: {
    padding: 20,
  },
  listHeader: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  listSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  studyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  studyContent: {
    flex: 1,
    padding: 16,
  },
  studyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  studyDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  studyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  studyDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  studyActions: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderLeftColor: '#f3f4f6',
  },
  actionButton: {
    padding: 8,
    marginVertical: 4,
  },
});

export default SavedScreen;
