import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, Clock, Users } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { format } from 'date-fns';
import { ja, enUS, zhCN, ko } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';

type EventProps = {
  event: {
    id: string;
    title: string;
    titleEn: string;
    date: string;
    image: string;
    category: string;
    price: number;
    slots: number;
    bookedSlots: number;
  };
};

export default function EventCard({ event }: EventProps) {
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
  
  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'PPP', { locale: getLocale() });
  const formattedTime = format(eventDate, 'p', { locale: getLocale() });
  
  // Calculate available slots
  const availableSlots = event.slots - event.bookedSlots;
  const slotsPercentage = (event.bookedSlots / event.slots) * 100;
  const isAlmostFull = slotsPercentage >= 70;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: spacing.md,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    row: {
      flexDirection: 'row',
    },
    imageContainer: {
      width: 100,
      height: 100,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    contentContainer: {
      flex: 1,
      padding: spacing.md,
    },
    title: {
      fontFamily: 'NotoSerifJP-Medium',
      fontSize: 16,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    infoText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: spacing.xs,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    priceText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.text,
    },
    bookButton: {
      backgroundColor: colors.primary,
      paddingVertical: 6,
      paddingHorizontal: spacing.sm,
      borderRadius: 16,
    },
    bookButtonText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 12,
      color: colors.invertedText,
    },
    slotsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    slotsText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      marginLeft: spacing.xs,
    },
    almostFullText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 12,
      color: colors.warning,
    },
    tag: {
      position: 'absolute',
      top: spacing.xs,
      left: spacing.xs,
      backgroundColor: colors.accent,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
    },
    tagText: {
      color: colors.invertedText,
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 10,
    },
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'healing': return colors.accent;
      case 'workshop': return colors.secondary;
      case 'community': return colors.success;
      case 'culinary': return colors.warning;
      default: return colors.accent;
    }
  };

  const getCategoryName = (category) => {
    switch (category) {
      case 'healing': return t('events.healing');
      case 'workshop': return t('events.workshop');
      case 'community': return t('events.community');
      case 'culinary': return t('events.culinary');
      default: return category;
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.image} />
          <View style={[styles.tag, { backgroundColor: getCategoryColor(event.category) }]}>
            <Text style={styles.tagText}>{getCategoryName(event.category)}</Text>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {language === 'en' ? event.titleEn : event.title}
          </Text>
          
          <View style={styles.infoRow}>
            <Calendar size={14} color={colors.textSecondary} />
            <Text style={styles.infoText}>{formattedDate}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={14} color={colors.textSecondary} />
            <Text style={styles.infoText}>{formattedTime}</Text>
          </View>
          
          <View style={styles.slotsContainer}>
            <Users size={14} color={colors.textSecondary} />
            {isAlmostFull ? (
              <Text style={styles.almostFullText}>
                {t('events.almostFull')} ({availableSlots} / {event.slots})
              </Text>
            ) : (
              <Text style={[styles.slotsText, { color: colors.textSecondary }]}>
                {availableSlots} / {event.slots} {t('events.available')}
              </Text>
            )}
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.priceText}>¥{event.price.toLocaleString()}</Text>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>{t('events.book')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}