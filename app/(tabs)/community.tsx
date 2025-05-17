import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/hooks/useTranslation';
import { TriangleAlert as AlertTriangle, Mail, Send, User } from 'lucide-react-native';
import AnnouncementCard from '@/components/community/AnnouncementCard';
import ShoutboardCard from '@/components/community/ShoutboardCard';
import { mockAnnouncementData, mockShoutboardData } from '@/data/communityData';

export default function CommunityScreen() {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('announcements');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.md,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    tabText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      marginLeft: spacing.xs,
    },
    activeTabIndicator: {
      position: 'absolute',
      bottom: 0,
      height: 3,
      width: '100%',
    },
    contentContainer: {
      flex: 1,
      padding: spacing.md,
    },
    alertBanner: {
      backgroundColor: colors.warning,
      padding: spacing.md,
      marginHorizontal: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    alertText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.invertedText,
      marginLeft: spacing.sm,
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    input: {
      flex: 1,
      backgroundColor: colors.cardSecondary,
      borderRadius: 20,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginRight: spacing.sm,
      fontFamily: 'NotoSansJP-Regular',
      color: colors.text,
    },
    sendButton: {
      backgroundColor: colors.primary,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    emptyText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.lg,
    },
  });

  const TabButton = ({ name, icon, onPress, isActive }) => {
    return (
      <TouchableOpacity style={styles.tabButton} onPress={onPress}>
        {icon}
        <Text 
          style={[
            styles.tabText, 
            { color: isActive ? colors.primary : colors.textSecondary }
          ]}
        >
          {name}
        </Text>
        {isActive && (
          <View 
            style={[
              styles.activeTabIndicator, 
              { backgroundColor: colors.primary }
            ]} 
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderAnnouncementsTab = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.alertBanner}>
        <AlertTriangle size={20} color={colors.invertedText} />
        <Text style={styles.alertText}>
          {t('community.phoneScamAlert')}
        </Text>
      </View>

      <FlatList
        data={mockAnnouncementData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <AnnouncementCard announcement={item} />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderShoutboardTab = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={mockShoutboardData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ShoutboardCard message={item} />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={{ marginRight: spacing.sm }}>
          <User size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.input}>{t('community.messageHint')}</Text>
        <TouchableOpacity style={styles.sendButton}>
          <Send size={18} color={colors.invertedText} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={t('community.title')} />
      
      <View style={styles.tabContainer}>
        <TabButton 
          name={t('community.announcements')} 
          icon={<Mail size={18} color={activeTab === 'announcements' ? colors.primary : colors.textSecondary} />}
          onPress={() => setActiveTab('announcements')}
          isActive={activeTab === 'announcements'}
        />
        <TabButton 
          name={t('community.shoutboard')} 
          icon={<User size={18} color={activeTab === 'shoutboard' ? colors.primary : colors.textSecondary} />}
          onPress={() => setActiveTab('shoutboard')}
          isActive={activeTab === 'shoutboard'}
        />
      </View>

      {activeTab === 'announcements' ? renderAnnouncementsTab() : renderShoutboardTab()}
    </View>
  );
}