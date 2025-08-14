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

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params;
  const {
    getStudiesByCategory,
    getVideosByCategory,
    getSubCategoriesByCategory
  } = useStudy();

  const subCategories = getSubCategoriesByCategory(category.id);
  const directStudies = getStudiesByCategory(category.id, null);
  const directVideos = getVideosByCategory(category.id, null);

  const totalItems = subCategories.length + directStudies.length + directVideos.length;

  const handleSubCategoryPress = (subCategory) => {
    navigation.navigate('SubCategory', { subCategory });
  };

  const handleStudyPress = (study) => {
    navigation.navigate('StudyDetail', { study });
  };

  const handleVideoPress = (video) => {
    navigation.navigate('VideoDetail', { video });
  };

  const renderSubCategoryCard = (subCategory) => {
    const subStudies = getStudiesByCategory(category.id, subCategory.id);
    const subVideos = getVideosByCategory(category.id, subCategory.id);
    const itemCount = subStudies.length + subVideos.length;

    return (
      <TouchableOpacity
        key={subCategory.id}
        style={styles.subCategoryCard}
        onPress={() => handleSubCategoryPress(subCategory)}
      >
        <View style={styles.folderIcon}>
          <Ionicons name="folder" size={32} color="#F59E0B" />
        </View>
        <View style={styles.subCategoryInfo}>
          <Text style={styles.subCategoryTitle}>{subCategory.name}</Text>
          <Text style={styles.subCategoryDescription} numberOfLines={2}>
            {subCategory.description}
          </Text>
          <Text style={styles.itemCount}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      </TouchableOpacity>
    );
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
        <Text style={styles.headerTitle}>{category.name}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Info */}
      <View style={styles.categoryInfo}>
        <View style={[styles.categoryIcon, { backgroundColor: category.backgroundColor }]}>
          <Ionicons name={category.icon} size={32} color={category.color} />
        </View>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        <Text style={styles.categoryDescription}>
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
              Studies and videos for this category will appear here when they are added.
            </Text>
          </View>
        ) : (
          <View style={styles.contentList}>
            {/* Sub-folders Section */}
            {subCategories.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="folder" size={20} color="#F59E0B" />
                  <Text style={styles.sectionTitle}>Folders ({subCategories.length})</Text>
                </View>
                {subCategories.map(renderSubCategoryCard)}
              </View>
            )}

            {/* Direct Studies Section */}
            {directStudies.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="document-text" size={20} color="#4F46E5" />
                  <Text style={styles.sectionTitle}>Studies ({directStudies.length})</Text>
                </View>
                {directStudies.map(renderStudyCard)}
              </View>
            )}

            {/* Direct Videos Section */}
            {directVideos.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="videocam" size={20} color="#EF4444" />
                  <Text style={styles.sectionTitle}>Videos ({directVideos.length})</Text>
                </View>
                {directVideos.map(renderVideoCard)}
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
  },
  placeholder: {
    width: 40,
  },
  categoryInfo: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 16,
    color: '#6b7280',
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
  subCategoryCard: {
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
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  folderIcon: {
    marginRight: 15,
  },
  subCategoryInfo: {
    flex: 1,
    marginRight: 10,
  },
  subCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  subCategoryDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 6,
  },
  itemCount: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
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

export default CategoryScreen;
