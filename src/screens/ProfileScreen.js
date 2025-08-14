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
import { useAuth } from '../context/AuthContext';
import { useStudy } from '../context/StudyContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isAdminLoggedIn, adminLogout } = useAuth();
  const { studies, savedStudies } = useStudy();

  const handleAdminAccess = () => {
    if (isAdminLoggedIn) {
      navigation.navigate('AdminDashboard');
    } else {
      navigation.navigate('AdminLogin');
    }
  };

  const handleAdminLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from admin?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: adminLogout },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Journey to Discovery',
      'Version 1.0.0\n\nA bible study app designed to help you grow in your faith through guided biblical studies.\n\nDeveloped with React Native.',
      [{ text: 'OK' }]
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share App',
      'Share functionality would be implemented here to invite others to download the app.',
      [{ text: 'OK' }]
    );
  };

  const handleFeedback = () => {
    Alert.alert(
      'Send Feedback',
      'Feedback functionality would be implemented here to send suggestions or report issues.',
      [{ text: 'OK' }]
    );
  };

  const renderMenuItem = (icon, title, subtitle, onPress, iconColor = '#6b7280', showChevron = true) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIcon, { backgroundColor: `${iconColor}15` }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
          </View>
          <Text style={styles.profileName}>Bible Study User</Text>
          <Text style={styles.profileEmail}>Welcome to Journey to Discovery</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{savedStudies.length}</Text>
            <Text style={styles.statLabel}>Saved Studies</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{studies.length}</Text>
            <Text style={styles.statLabel}>Total Studies</Text>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Study Management</Text>
          <View style={styles.menuContainer}>
            {renderMenuItem(
              'bookmark',
              'Saved Studies',
              `${savedStudies.length} studies saved`,
              () => navigation.navigate('Saved'),
              '#4F46E5'
            )}
            {renderMenuItem(
              'book',
              'All Studies',
              `Browse ${studies.length} available studies`,
              () => navigation.navigate('Studies'),
              '#10B981'
            )}
          </View>
        </View>

        {/* Admin Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Administration</Text>
          <View style={styles.menuContainer}>
            {renderMenuItem(
              isAdminLoggedIn ? 'shield-checkmark' : 'shield',
              isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login',
              isAdminLoggedIn ? 'Manage study content' : 'Access admin features',
              handleAdminAccess,
              isAdminLoggedIn ? '#10B981' : '#F59E0B'
            )}
            {isAdminLoggedIn && renderMenuItem(
              'log-out',
              'Logout Admin',
              'Sign out from admin account',
              handleAdminLogout,
              '#EF4444'
            )}
          </View>
        </View>

        {/* App Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>App</Text>
          <View style={styles.menuContainer}>
            {renderMenuItem(
              'share',
              'Share App',
              'Invite others to join',
              handleShare,
              '#3B82F6'
            )}
            {renderMenuItem(
              'chatbubble',
              'Send Feedback',
              'Help us improve the app',
              handleFeedback,
              '#8B5CF6'
            )}
            {renderMenuItem(
              'information-circle',
              'About',
              'App version and info',
              handleAbout,
              '#6B7280'
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Journey to Discovery v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            Made with ❤️ for spiritual growth
          </Text>
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
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  menuSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },
  menuContainer: {
    backgroundColor: '#fff',
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
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default ProfileScreen;
