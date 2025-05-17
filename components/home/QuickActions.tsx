import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, BookOpen, Map, Bell } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';

export default function QuickActions() {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: spacing.lg,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    actionButton: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
      alignItems: 'center',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    actionText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
    },
  });

  const actions = [
    {
      id: 'events',
      title: t('tabs.events'),
      icon: <Calendar size={24} color={colors.invertedText} />,
      color: colors.primary,
      route: '/events',
    },
    {
      id: 'rooms',
      title: t('tabs.rooms'),
      icon: <BookOpen size={24} color={colors.invertedText} />,
      color: colors.secondary,
      route: '/rooms',
    },
    {
      id: 'explore',
      title: t('tabs.explore'),
      icon: <Map size={24} color={colors.invertedText} />,
      color: colors.accent,
      route: '/explore',
    },
    {
      id: 'community',
      title: t('tabs.community'),
      icon: <Bell size={24} color={colors.invertedText} />,
      color: colors.success,
      route: '/community',
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map(action => (
        <TouchableOpacity key={action.id} style={styles.actionButton}>
          <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
            {action.icon}
          </View>
          <Text style={styles.actionText}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}