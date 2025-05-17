import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { TriangleAlert as AlertTriangle, Info, Calendar } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { format } from 'date-fns';
import { ja, enUS, zhCN, ko } from 'date-fns/locale';

type AnnouncementProps = {
  announcement: {
    id: string;
    title: string;
    titleEn: string;
    content: string;
    contentEn: string;
    type: string;
    date: string;
    author: string;
  };
};

export default function AnnouncementCard({ announcement }: AnnouncementProps) {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // Get the appropriate date-fns locale based on current language
  const getLocale = () => {
    switch (language) {
      case 'ja': return ja;
      case 'zh': return zhCN;
      case 'ko': return ko;
      default: return enUS;
    }
  };
  
  const announcementDate = new Date(announcement.date);
  const formattedDate = format(announcementDate, 'PPP', { locale: getLocale() });
  const formattedTime = format(announcementDate, 'p', { locale: getLocale() });
  
  // Determine if this is a warning or regular info announcement
  const isWarning = announcement.type === 'warning';

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isWarning ? colors.cardSecondary : colors.card,
      borderRadius: 12,
      marginBottom: spacing.md,
      overflow: 'hidden',
      borderLeftWidth: 4,
      borderLeftColor: isWarning ? colors.warning : colors.accent,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    contentContainer: {
      padding: spacing.md,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    icon: {
      marginRight: spacing.sm,
    },
    title: {
      fontFamily: 'NotoSerifJP-Medium',
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    dateText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: spacing.xs,
    },
    content: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.md,
    },
    author: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
    readMoreButton: {
      paddingVertical: 4,
    },
    readMoreText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 12,
      color: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          {isWarning ? (
            <AlertTriangle size={20} color={colors.warning} style={styles.icon} />
          ) : (
            <Info size={20} color={colors.accent} style={styles.icon} />
          )}
          <Text style={styles.title}>
            {language === 'en' ? announcement.titleEn : announcement.title}
          </Text>
        </View>
        
        <View style={styles.dateContainer}>
          <Calendar size={14} color={colors.textSecondary} />
          <Text style={styles.dateText}>{formattedDate} · {formattedTime}</Text>
        </View>
        
        <Text style={styles.content} numberOfLines={3}>
          {language === 'en' ? announcement.contentEn : announcement.content}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.author}>{announcement.author}</Text>
          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>{t('community.readMore')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}