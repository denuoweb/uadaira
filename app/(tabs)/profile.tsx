import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { User, Settings, Bell, Moon, Calendar, LogOut, Heart, CircleHelp as HelpCircle, Globe } from 'lucide-react-native';

export default function ProfileScreen() {
  const { colors, spacing, toggleTheme, isDark } = useTheme();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flex: 1,
    },
    userSection: {
      padding: spacing.lg,
      alignItems: 'center',
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: spacing.md,
    },
    userName: {
      fontFamily: 'NotoSerifJP-Bold',
      fontSize: 20,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    userEmail: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: spacing.md,
    },
    loginButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: 20,
    },
    loginButtonText: {
      fontFamily: 'NotoSansJP-Medium',
      color: colors.invertedText,
      fontSize: 14,
    },
    sectionTitle: {
      fontFamily: 'NotoSerifJP-Medium',
      fontSize: 16,
      color: colors.text,
      marginVertical: spacing.md,
      marginHorizontal: spacing.lg,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuIcon: {
      marginRight: spacing.md,
      width: 24,
    },
    menuText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    languageSelector: {
      flexDirection: 'row',
      backgroundColor: colors.cardSecondary,
      borderRadius: 8,
      overflow: 'hidden',
    },
    languageOption: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    languageText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 12,
    },
    version: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
      marginVertical: spacing.lg,
    },
  });

  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ko', name: '한국어' },
  ];

  const MenuItem = ({ icon, text, onPress, children }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <Text style={styles.menuText}>{text}</Text>
      {children}
    </TouchableOpacity>
  );

  const renderLoginSection = () => {
    if (isLoggedIn) {
      return (
        <View style={styles.userSection}>
          <Image 
            source={require('@/assets/images/avatar.png')} 
            style={styles.avatar} 
          />
          <Text style={styles.userName}>Yuki Tanaka</Text>
          <Text style={styles.userEmail}>yuki.tanaka@example.com</Text>
        </View>
      );
    }

    return (
      <View style={styles.userSection}>
        <Image 
          source={require('@/assets/images/guest-avatar.png')} 
          style={styles.avatar} 
        />
        <Text style={styles.userName}>{t('profile.guest')}</Text>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => setIsLoggedIn(true)}
        >
          <Text style={styles.loginButtonText}>{t('profile.login')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={t('profile.title')} />
      
      <ScrollView style={styles.scrollContainer}>
        {renderLoginSection()}

        <Text style={styles.sectionTitle}>{t('profile.account')}</Text>
        
        <MenuItem 
          icon={<User size={20} color={colors.primary} />} 
          text={t('profile.myProfile')}
          onPress={() => {}}
        />
        
        <MenuItem 
          icon={<Calendar size={20} color={colors.primary} />} 
          text={t('profile.myBookings')}
          onPress={() => {}}
        />
        
        <MenuItem 
          icon={<Heart size={20} color={colors.primary} />} 
          text={t('profile.favorites')}
          onPress={() => {}}
        />
        
        <MenuItem 
          icon={<Bell size={20} color={colors.primary} />} 
          text={t('profile.notifications')}
          onPress={() => {}}
        />

        <Text style={styles.sectionTitle}>{t('profile.preferences')}</Text>
        
        <MenuItem 
          icon={<Moon size={20} color={colors.primary} />} 
          text={t('profile.darkMode')}
          onPress={() => {}}
        >
          <Switch
            trackColor={{ false: colors.cardSecondary, true: colors.primaryLight }}
            thumbColor={isDark ? colors.primary : colors.textSecondary}
            ios_backgroundColor={colors.cardSecondary}
            onValueChange={toggleTheme}
            value={isDark}
          />
        </MenuItem>
        
        <MenuItem 
          icon={<Globe size={20} color={colors.primary} />} 
          text={t('profile.language')}
          onPress={() => {}}
        >
          <View style={styles.languageSelector}>
            {languages.map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  {
                    backgroundColor: language === lang.code ? colors.primary : 'transparent',
                    width: 40,
                  }
                ]}
                onPress={() => setLanguage(lang.code)}
              >
                <Text 
                  style={[
                    styles.languageText,
                    { color: language === lang.code ? colors.invertedText : colors.text }
                  ]}
                >
                  {lang.code.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </MenuItem>

        <Text style={styles.sectionTitle}>{t('profile.support')}</Text>
        
        <MenuItem 
          icon={<HelpCircle size={20} color={colors.primary} />} 
          text={t('profile.help')}
          onPress={() => {}}
        />
        
        <MenuItem 
          icon={<Settings size={20} color={colors.primary} />} 
          text={t('profile.settings')}
          onPress={() => {}}
        />
        
        {isLoggedIn && (
          <MenuItem 
            icon={<LogOut size={20} color={colors.error} />} 
            text={t('profile.logout')}
            onPress={() => setIsLoggedIn(false)}
          />
        )}

        <Text style={styles.version}>Uedaira House v1.0.0</Text>
      </ScrollView>
    </View>
  );
}