import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function CommunityUpdates() {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    updateContainer: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: spacing.md,
      overflow: 'hidden',
    },
    alertContainer: {
      backgroundColor: colors.cardSecondary,
      borderLeftWidth: 4,
      borderLeftColor: colors.warning,
      borderRadius: 12,
      padding: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    alertIcon: {
      marginRight: spacing.sm,
    },
    alertText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.text,
      flex: 1,
    },
    imageContainer: {
      height: 120,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    contentContainer: {
      padding: spacing.md,
    },
    updateTitle: {
      fontFamily: 'NotoSerifJP-Medium',
      fontSize: 16,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    updateDate: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: spacing.sm,
    },
    updateText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    viewAllButton: {
      alignItems: 'center',
      padding: spacing.sm,
    },
    viewAllText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.primary,
    },
  });

  const updates = [
    {
      id: 'alert',
      type: 'alert',
      title: t('community.phoneScamAlert'),
    },
    {
      id: 'event1',
      type: 'update',
      title: '新しいワークショップのお知らせ (New Workshop Announcement)',
      date: '2025年6月10日',
      content: '来週から始まる「ビジョンノートワークショップ」の参加者を募集しています。自分の目標や夢を視覚化する素晴らしい機会です。',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
    },
    {
      id: 'event2',
      type: 'update',
      title: '地元の農家による特別ランチ (Special Lunch by Local Farmers)',
      date: '2025年6月5日',
      content: '今週末、地元の農家による特別ランチイベントを開催します。新鮮な季節の野菜を使った料理をお楽しみください。',
      image: 'https://images.pexels.com/photos/5677794/pexels-photo-5677794.jpeg',
    },
  ];

  const renderAlert = (update) => (
    <View key={update.id} style={styles.alertContainer}>
      <AlertTriangle size={20} color={colors.warning} style={styles.alertIcon} />
      <Text style={styles.alertText}>{update.title}</Text>
    </View>
  );

  const renderUpdate = (update) => (
    <TouchableOpacity key={update.id} style={styles.updateContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: update.image }} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.updateTitle}>{update.title}</Text>
        <Text style={styles.updateDate}>{update.date}</Text>
        <Text style={styles.updateText} numberOfLines={2}>
          {update.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {updates.map(update => {
        if (update.type === 'alert') return renderAlert(update);
        return renderUpdate(update);
      })}
      
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>{t('community.viewAll')}</Text>
      </TouchableOpacity>
    </View>
  );
}