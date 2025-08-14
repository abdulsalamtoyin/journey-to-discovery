import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStudy } from '../context/StudyContext';

const StudiesScreen = () => {
  const navigation = useNavigation();
  const { studies, categories, getCategoryById } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredStudies = studies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || study.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStudyPress = (study) => {
    navigation.navigate('StudyDetail', { study });
  };

  const renderStudyCard = (study) => {
    const category = getCategoryById(study.categoryId);
    
    return (
      <TouchableOpacity
        key={study.id}
        style={styles.studyCard}
        onPress={() => handleStudyPress(study)}
      >
        <View style={styles.studyContent}>
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
        </View>
        <View style={styles.studyAction}>
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryFilter = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.filterChip,
        selectedCategory === category.id && styles.filterChipSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text style={[
        styles.filterChipText,
        selectedCategory === category.id && styles.filterChipTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Studies</Text>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIconLeft} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search studies..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedCategory === 'all' && styles.filterChipSelected
            ]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[
              styles.filterChipText,
              selectedCategory === 'all' && styles.filterChipTextSelected
            ]}>
              All Categories
            </Text>
          </TouchableOpacity>
          {categories.map(renderCategoryFilter)}
        </ScrollView>
      </View>

      {/* Studies List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.studiesHeader}>
          <Text style={styles.studiesCount}>
            {filteredStudies.length} {filteredStudies.length === 1 ? 'study' : 'studies'} found
          </Text>
        </View>

        {filteredStudies.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>No studies found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Studies will appear here when they are added'
              }
            </Text>
          </View>
        ) : (
          <View style={styles.studiesList}>
            {filteredStudies.map(renderStudyCard)}
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
  searchIcon: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIconLeft: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filtersScroll: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    marginRight: 10,
  },
  filterChipSelected: {
    backgroundColor: '#4F46E5',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  filterChipTextSelected: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  studiesHeader: {
    marginBottom: 15,
  },
  studiesCount: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  studiesList: {
    paddingBottom: 20,
  },
  studyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
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
    marginRight: 10,
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
  studyAction: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default StudiesScreen;
