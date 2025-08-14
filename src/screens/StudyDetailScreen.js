import React, { useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStudy } from '../context/StudyContext';

const StudyDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { study } = route.params;
  const { getCategoryById, saveStudy, unsaveStudy, savedStudies } = useStudy();
  
  const category = getCategoryById(study.categoryId);
  const [isSaved, setIsSaved] = useState(savedStudies.includes(study.id));

  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        await unsaveStudy(study.id);
        setIsSaved(false);
        Alert.alert('Removed', 'Study removed from saved studies');
      } else {
        await saveStudy(study.id);
        setIsSaved(true);
        Alert.alert('Saved', 'Study saved to your library');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update saved studies');
    }
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share functionality would be implemented here');
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
        {/* Study Header */}
        <View style={styles.studyHeader}>
          <View style={styles.categoryBadge}>
            <View style={[styles.categoryIcon, { backgroundColor: category?.backgroundColor }]}>
              <Ionicons name={category?.icon} size={16} color={category?.color} />
            </View>
            <Text style={[styles.categoryText, { color: category?.color }]}>
              {category?.name}
            </Text>
          </View>
          
          <Text style={styles.studyTitle}>{study.title}</Text>
          <Text style={styles.studyDescription}>{study.description}</Text>
          
          <View style={styles.studyMeta}>
            <Text style={styles.studyDate}>
              Published {new Date(study.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Study Content */}
        <View style={styles.studyContent}>
          <Text style={styles.contentTitle}>Study Content</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{study.content}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSaveToggle}>
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.primaryButtonText}>
              {isSaved ? 'Saved' : 'Save Study'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
            <Ionicons
              name="share-outline"
              size={20}
              color="#4F46E5"
              style={styles.buttonIcon}
            />
            <Text style={styles.secondaryButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Related Studies Section */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>More from {category?.name}</Text>
          <View style={styles.relatedPlaceholder}>
            <Text style={styles.relatedPlaceholderText}>
              Related studies will appear here
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
  studyHeader: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryBadge: {
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
  studyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    lineHeight: 34,
  },
  studyDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 15,
  },
  studyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studyDate: {
    fontSize: 14,
    color: '#9ca3af',
  },
  studyContent: {
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
  contentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    padding: 20,
    paddingBottom: 0,
  },
  contentContainer: {
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
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

export default StudyDetailScreen;
