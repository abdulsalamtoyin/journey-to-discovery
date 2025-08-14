import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStudy } from '../context/StudyContext';

const VideosScreen = () => {
  const navigation = useNavigation();
  const { videos, categories, getCategoryById } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVideoPress = (video) => {
    navigation.navigate('VideoDetail', { video });
  };

  const renderVideoCard = (video) => {
    const category = getCategoryById(video.categoryId);
    
    return (
      <TouchableOpacity
        key={video.id}
        style={styles.videoCard}
        onPress={() => handleVideoPress(video)}
      >
        <View style={styles.videoThumbnail}>
          {video.thumbnailUrl ? (
            <Image source={{ uri: video.thumbnailUrl }} style={styles.thumbnailImage} />
          ) : (
            <View style={styles.defaultThumbnail}>
              <Ionicons name="play-circle" size={40} color="#fff" />
            </View>
          )}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{video.duration || '0:00'}</Text>
          </View>
        </View>
        
        <View style={styles.videoContent}>
          <View style={styles.videoHeader}>
            <View style={styles.categoryBadge}>
              <View style={[styles.categoryDot, { backgroundColor: category?.color }]} />
              <Text style={styles.categoryText}>{category?.name}</Text>
            </View>
            <Text style={styles.videoDate}>
              {new Date(video.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.videoTitle}>{video.title}</Text>
          <Text style={styles.videoDescription} numberOfLines={2}>
            {video.description}
          </Text>
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
        <Text style={styles.headerTitle}>Video Library</Text>
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
            placeholder="Search videos..."
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

      {/* Videos List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.videosHeader}>
          <Text style={styles.videosCount}>
            {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'} found
          </Text>
        </View>

        {filteredVideos.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="videocam-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>No videos found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Videos will appear here when they are added'
              }
            </Text>
          </View>
        ) : (
          <View style={styles.videosList}>
            {filteredVideos.map(renderVideoCard)}
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
  videosHeader: {
    marginBottom: 15,
  },
  videosCount: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  videosList: {
    paddingBottom: 20,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  videoThumbnail: {
    height: 200,
    backgroundColor: '#f3f4f6',
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  defaultThumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#374151',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  videoContent: {
    padding: 16,
  },
  videoHeader: {
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
  videoDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
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

export default VideosScreen;
