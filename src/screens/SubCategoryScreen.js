import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStudy } from '../context/StudyContext';

const SubCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subCategory } = route.params;
  const { 
    getStudiesByCategory, 
    getVideosByCategory, 
    getCategoryById 
  } = useStudy();

  const category = getCategoryById(subCategory.parentCategoryId);
  const studies = getStudiesByCategory(subCategory.parentCategoryId, subCategory.id);
  const videos = getVideosByCategory(subCategory.parentCategoryId, subCategory.id);

  const handleStudyPress = (study) => {
    navigation.navigate('StudyDetail', { study });
  };

  const handleVideoPress = (video) => {
    navigation.navigate('VideoDetail', { video });
  };

  const renderStudyCard = (study) => (
    <TouchableOpacity
      key={study.id}
      style={styles.contentCard}
      onPress={() => handleStudyPress(study)}
    >
      <View style={styles.contentIcon}>
        <Ionicons name="document-text" size={24} color="#4F46E5" />
      </View>
      <View style={styles.contentInfo}>
        <Text style={styles.contentTitle}>{study.title}</Text>
        <Text style={styles.contentDescription} numberOfLines={2}>
          {study.description}
        </Text>
        <Text style={styles.contentMeta}>
          Study • {new Date(study.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6b7280" />
    </TouchableOpacity>
  );

  const renderVideoCard = (video) => (
    <TouchableOpacity
      key={video.id}
      style={styles.contentCard}
      onPress={() => handleVideoPress(video)}
    >
      <View style={styles.contentIcon}>
        <Ionicons name="videocam" size={24} color="#EF4444" />
      </View>
      <View style={styles.contentInfo}>
        <Text style={styles.contentTitle}>{video.title}</Text>
        <Text style={styles.contentDescription} numberOfLines={2}>
          {video.description}
        </Text>
        <Text style={styles.contentMeta}>
          Video • {video.duration || '0:00'} • {new Date(video.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6b7280" />
    </TouchableOpacity>
  );

  const totalItems = studies.length + videos.length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{subCategory.name}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* SubCategory Info */}
      <View style={styles.subCategoryInfo}>
        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <View style={[styles.categoryIcon, { backgroundColor: category?.backgroundColor }]}>
            <Ionicons name={category?.icon} size={16} color={category?.color} />
          </View>
          <Text style={[styles.breadcrumbText, { color: category?.color }]}>
            {category?.name}
          </Text>
          <Ionicons name="chevron-forward" size={14} color="#9ca3af" style={styles.breadcrumbArrow} />
          <Text style={styles.breadcrumbCurrent}>{subCategory.name}</Text>
        </View>

        <Text style={styles.subCategoryTitle}>{subCategory.name}</Text>
        <Text style={styles.subCategoryDescription}>{subCategory.description}</Text>
        <Text style={styles.itemCount}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'} available
        </Text>
      </View>

      {/* Content List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {totalItems === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>No content yet</Text>
            <Text style={styles.emptyStateText}>
              Studies and videos for this sub-category will appear here when they are added.
            </Text>
          </View>
        ) : (
          <View style={styles.contentList}>
            {/* Studies Section */}
            {studies.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="document-text" size={20} color="#4F46E5" />
                  <Text style={styles.sectionTitle}>Studies ({studies.length})</Text>
                </View>
                {studies.map(renderStudyCard)}
              </View>
            )}

            {/* Videos Section */}
            {videos.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="videocam" size={20} color="#EF4444" />
                  <Text style={styles.sectionTitle}>Videos ({videos.length})</Text>
                </View>
                {videos.map(renderVideoCard)}
              </View>
            )}
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  subCategoryInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  breadcrumbText: {
    fontSize: 14,
    fontWeight: '600',
  },
  breadcrumbArrow: {
    marginHorizontal: 8,
  },
  breadcrumbCurrent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  subCategoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  subCategoryDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 10,
  },
  itemCount: {
    fontSize: 14,
    color: '#9ca3af',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  contentList: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  contentCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contentInfo: {
    flex: 1,
    marginRight: 10,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 6,
  },
  contentMeta: {
    fontSize: 12,
    color: '#9ca3af',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
});

export default SubCategoryScreen;
