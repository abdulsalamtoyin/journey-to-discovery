import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStudy } from '../context/StudyContext';

const { width } = Dimensions.get('window');
const videoHeight = (width * 9) / 16; // 16:9 aspect ratio

const VideoDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { video } = route.params;
  const { getCategoryById, getSubCategoryById, saveVideo, unsaveVideo, savedVideos } = useStudy();
  
  const category = getCategoryById(video.categoryId);
  const subCategory = video.subCategoryId ? getSubCategoryById(video.subCategoryId) : null;
  const [isSaved, setIsSaved] = useState(savedVideos.includes(video.id));

  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        await unsaveVideo(video.id);
        setIsSaved(false);
        Alert.alert('Removed', 'Video removed from saved videos');
      } else {
        await saveVideo(video.id);
        setIsSaved(true);
        Alert.alert('Saved', 'Video saved to your library');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update saved videos');
    }
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share functionality would be implemented here');
  };

  const handlePlayVideo = () => {
    Alert.alert(
      'Play Video',
      'In a real app, this would open a video player or browser to play the video.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Browser', onPress: () => {
          // In a real app, you'd use Linking.openURL(video.videoUrl)
          console.log('Opening video:', video.videoUrl);
        }},
      ]
    );
  };

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
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerAction} onPress={handleSaveToggle}>
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isSaved ? "#4F46E5" : "#6b7280"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video Player Area */}
        <View style={styles.videoContainer}>
          <TouchableOpacity style={styles.videoPlayer} onPress={handlePlayVideo}>
            <View style={styles.videoOverlay}>
              <Ionicons name="play-circle" size={80} color="#fff" />
              <Text style={styles.playText}>Tap to Play</Text>
            </View>
            {video.duration && (
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{video.duration}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Video Info */}
        <View style={styles.videoInfo}>
          <View style={styles.categoryBreadcrumb}>
            <View style={[styles.categoryIcon, { backgroundColor: category?.backgroundColor }]}>
              <Ionicons name={category?.icon} size={16} color={category?.color} />
            </View>
            <Text style={[styles.categoryText, { color: category?.color }]}>
              {category?.name}
            </Text>
            {subCategory && (
              <>
                <Ionicons name="chevron-forward" size={14} color="#9ca3af" style={styles.breadcrumbArrow} />
                <Text style={styles.subCategoryText}>{subCategory.name}</Text>
              </>
            )}
          </View>
          
          <Text style={styles.videoTitle}>{video.title}</Text>
          <Text style={styles.videoDescription}>{video.description}</Text>
          
          <View style={styles.videoMeta}>
            <Text style={styles.videoDate}>
              Published {new Date(video.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={handlePlayVideo}>
            <Ionicons
              name="play"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.primaryButtonText}>Watch Video</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSaveToggle}>
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={20}
              color="#4F46E5"
              style={styles.buttonIcon}
            />
            <Text style={styles.secondaryButtonText}>
              {isSaved ? 'Saved' : 'Save Video'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Video Details */}
        {video.videoUrl && (
          <View style={styles.videoDetails}>
            <Text style={styles.detailsTitle}>Video Details</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Video URL:</Text>
                <Text style={styles.detailValue} numberOfLines={1}>
                  {video.videoUrl}
                </Text>
              </View>
              {video.duration && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duration:</Text>
                  <Text style={styles.detailValue}>{video.duration}</Text>
                </View>
              )}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category:</Text>
                <Text style={styles.detailValue}>
                  {category?.name}{subCategory ? ` > ${subCategory.name}` : ''}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Related Videos Section */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>More from {category?.name}</Text>
          <View style={styles.relatedPlaceholder}>
            <Text style={styles.relatedPlaceholderText}>
              Related videos will appear here
            </Text>
          </View>
        </View>
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
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    marginLeft: 15,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    backgroundColor: '#000',
  },
  videoPlayer: {
    height: videoHeight,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoOverlay: {
    alignItems: 'center',
  },
  playText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  videoInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryBreadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  breadcrumbArrow: {
    marginHorizontal: 8,
  },
  subCategoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  videoTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    lineHeight: 34,
  },
  videoDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 15,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoDate: {
    fontSize: 14,
    color: '#9ca3af',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
  videoDetails: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    padding: 20,
    paddingBottom: 0,
  },
  detailsContainer: {
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#1f2937',
    flex: 2,
    textAlign: 'right',
  },
  relatedSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  relatedPlaceholder: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  relatedPlaceholderText: {
    fontSize: 16,
    color: '#9ca3af',
  },
});

export default VideoDetailScreen;
