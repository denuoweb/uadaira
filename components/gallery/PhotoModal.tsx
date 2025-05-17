import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { format } from 'date-fns';
import { ja, enUS, zhCN, ko } from 'date-fns/locale';

type PhotoModalProps = {
  photo: {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    category: string;
    date: string;
    imageUrl: string;
  };
  onClose: () => void;
};

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
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
  
  const photoDate = new Date(photo.date);
  const formattedDate = format(photoDate, 'PPP', { locale: getLocale() });

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 10,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '80%',
      resizeMode: 'contain',
    },
    infoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: spacing.md,
    },
    title: {
      fontFamily: 'NotoSerifJP-Bold',
      fontSize: 18,
      color: '#FFFFFF',
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
      color: '#CCCCCC',
      marginLeft: spacing.xs,
    },
    description: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: '#FFFFFF',
      lineHeight: 20,
    },
    navigationButtons: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '50%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
    },
    navButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: photo.imageUrl }}
            style={styles.image}
          />
        </View>
        
        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navButton}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <ChevronRight size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.title}>
            {language === 'en' ? photo.titleEn : photo.title}
          </Text>
          
          <View style={styles.dateContainer}>
            <Calendar size={16} color="#CCCCCC" />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          
          <ScrollView>
            <Text style={styles.description}>
              {language === 'en' ? photo.descriptionEn : photo.description}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}