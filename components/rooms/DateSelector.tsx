import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Calendar } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { format, addDays } from 'date-fns';
import { ja, enUS, zhCN, ko } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';

type DateSelectorProps = {
  checkInDate: Date;
  checkOutDate: Date;
  onCheckInChange: (date: Date) => void;
  onCheckOutChange: (date: Date) => void;
};

export default function DateSelector({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
}: DateSelectorProps) {
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

  const formattedCheckIn = format(checkInDate, 'yyyy/MM/dd (EEE)', { locale: getLocale() });
  const formattedCheckOut = format(checkOutDate, 'yyyy/MM/dd (EEE)', { locale: getLocale() });

  const styles = StyleSheet.create({
    container: {
      paddingVertical: spacing.sm,
    },
    header: {
      fontFamily: 'NotoSerifJP-Medium',
      fontSize: 16,
      color: colors.text,
      marginBottom: spacing.sm,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: spacing.sm,
      marginHorizontal: spacing.xs,
      backgroundColor: colors.background,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    label: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: spacing.xs,
    },
    date: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.text,
    },
    quickOptions: {
      flexDirection: 'row',
      marginTop: spacing.sm,
    },
    optionButton: {
      backgroundColor: colors.cardSecondary,
      paddingVertical: 6,
      paddingHorizontal: spacing.sm,
      borderRadius: 16,
      marginRight: spacing.sm,
    },
    optionText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 12,
      color: colors.text,
    },
  });

  const quickOptions = [
    { label: t('rooms.tonight'), days: 0 },
    { label: t('rooms.tomorrow'), days: 1 },
    { label: t('rooms.weekend'), days: getNextWeekendDay() },
  ];

  // Helper function to get the next Saturday
  function getNextWeekendDay() {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 6 = Saturday
    
    // If today is Sunday (0), return 6 (next Saturday)
    // If today is Monday (1), return 5 (next Saturday)
    // And so on...
    return day === 6 ? 7 : 6 - day;
  }

  const handleQuickOption = (days: number) => {
    const newCheckIn = addDays(new Date(), days);
    onCheckInChange(newCheckIn);
    onCheckOutChange(addDays(newCheckIn, 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('rooms.selectDates')}</Text>
      
      <View style={styles.row}>
        <TouchableOpacity style={styles.dateContainer}>
          <View style={styles.labelRow}>
            <Calendar size={14} color={colors.textSecondary} />
            <Text style={styles.label}>{t('rooms.checkIn')}</Text>
          </View>
          <Text style={styles.date}>{formattedCheckIn}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.dateContainer}>
          <View style={styles.labelRow}>
            <Calendar size={14} color={colors.textSecondary} />
            <Text style={styles.label}>{t('rooms.checkOut')}</Text>
          </View>
          <Text style={styles.date}>{formattedCheckOut}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.quickOptions}>
        {quickOptions.map((option, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.optionButton}
            onPress={() => handleQuickOption(option.days)}
          >
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}