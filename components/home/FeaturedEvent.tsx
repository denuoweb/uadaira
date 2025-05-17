import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowRight, Calendar } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { format } from 'date-fns';
import { ja, enUS, zhCN, ko } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';

export default function FeaturedEvent() {
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
  
  const eventDate = new Date('2025-07-15T18:00:00');
  const formattedDate = format(eventDate, 'PPP', { locale: getLocale() });
  const formattedTime = format(eventDate, 'p', { locale: getLocale() });

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: spacing.lg,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.card,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    image: {
      width: '100%',
      height: 180,
      resizeMode: 'cover',
    },
    contentContainer: {
      padding: spacing.md,
    },
    tag: {
      position: 'absolute',
      top: spacing.md,
      left: spacing.md,
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
      borderRadius: 16,
    },
    tagText: {
      color: colors.invertedText,
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 12,
    },
    title: {
      fontFamily: 'NotoSerifJP-Bold',
      fontSize: 18,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    dateText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: spacing.xs,
    },
    description: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
      marginBottom: spacing.md,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: spacing.md,
      marginTop: spacing.xs,
    },
    priceText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 16,
      color: colors.text,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.primary,
      marginRight: spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg' }} 
        style={styles.image} 
      />
      
      <View style={styles.tag}>
        <Text style={styles.tagText}>{t('events.healing')}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>ヨガと瞑想 (Yoga & Meditation)</Text>
        
        <View style={styles.dateContainer}>
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={styles.dateText}>{formattedDate} · {formattedTime}</Text>
        </View>
        
        <Text style={styles.description}>
          心と体を整えるヨガと瞑想セッションに参加してみませんか？自然に囲まれた環境で深いリラクゼーションを体験しましょう。初心者から上級者まで、どなたでも参加いただけます。
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.priceText}>¥2,500</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{t('events.learnMore')}</Text>
            <ArrowRight size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}