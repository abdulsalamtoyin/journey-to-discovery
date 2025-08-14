import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStudy } from '../context/StudyContext';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const { categories, getCategoryStats } = useStudy();
  const { isAdminLoggedIn } = useAuth();

  const categoryStats = getCategoryStats();

  const handleCategoryPress = (category) => {
    navigation.navigate('Category', { category });
  };

  const handleAdminPress = () => {
    if (isAdminLoggedIn) {
      navigation.navigate('AdminDashboard');
    } else {
      navigation.navigate('AdminLogin');
    }
  };

  const renderCategoryCard = (categoryData) => {
    return (
      <TouchableOpacity
        key={categoryData.id}
        style={styles.categoryCard}
        onPress={() => handleCategoryPress(categoryData)}
      >
        <View style={[styles.iconContainer, { backgroundColor: categoryData.backgroundColor }]}>
          <Ionicons name={categoryData.icon} size={24} color={categoryData.color} />
        </View>
        <Text style={styles.categoryTitle}>{categoryData.name}</Text>
        <Text style={styles.materialCount}>
          {categoryData.totalItems} items
          {categoryData.subFolderCount > 0 && (
            <Text style={styles.folderCount}> • {categoryData.subFolderCount} folders</Text>
          )}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoNumber}>4</Text>
            </View>
            <Text style={styles.logoText}>
              JOURNEY<Text style={styles.logoTextOrange}>DISCOVERY</Text>
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="people-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="share-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon} onPress={handleAdminPress}>
              <Ionicons name="person-circle-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.8)', 'rgba(245, 158, 11, 0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <Text style={styles.heroTitle}>Welcome to Journey 2 Discovery</Text>
          <Text style={styles.heroSubtitle}>
            Transform your faith through guided biblical studies
          </Text>
        </LinearGradient>

        {/* Study Categories */}
        <View style={styles.categoriesSection}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesTitle}>Study Categories</Text>
            <Text style={styles.categoriesCount}>9 Categories</Text>
          </View>
          
          <View style={styles.categoriesGrid}>
            {categoryStats.map(renderCategoryCard)}
          </View>
        </View>

        {/* Continue Your Journey Section */}
        <View style={styles.continueSection}>
          <View style={styles.continueSectionHeader}>
            <Text style={styles.continueSectionTitle}>Continue Your Journey</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.noStudiesContainer}>
            <Text style={styles.noStudiesTitle}>No recent studies yet</Text>
            <Text style={styles.noStudiesSubtitle}>
              Start exploring categories above to begin your journey
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
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  logoTextOrange: {
    color: '#F59E0B',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 15,
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoriesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  categoriesCount: {
    fontSize: 16,
    color: '#6b7280',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  materialCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  folderCount: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  continueSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  continueSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  continueSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  noStudiesContainer: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 12,
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
  noStudiesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 10,
  },
  noStudiesSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default HomeScreen;
