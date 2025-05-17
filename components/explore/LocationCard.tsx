import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { MapPin, Clock, Phone, Globe, ExternalLink } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type LocationProps = {
  location: {
    id: string;
    name: string;
    nameEn: string;
    category: string;
    description: string;
    descriptionEn: string;
    distance: number;
    image: string;
    address: string;
    openHours: string;
    phone: string;
    website: string;
  };
};

export default function LocationCard({ location }: LocationProps) {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const [expanded, setExpanded] = React.useState(false);

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
    imageContainer: {
      height: 150,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    categoryTag: {
      position: 'absolute',
      top: spacing.md,
      left: spacing.md,
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
      borderRadius: 16,
    },
    categoryText: {
      color: colors.invertedText,
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 12,
    },
    distanceTag: {
      position: 'absolute',
      top: spacing.md,
      right: spacing.md,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    distanceText: {
      color: '#FFFFFF',
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 12,
      marginLeft: spacing.xs,
    },
    contentContainer: {
      padding: spacing.md,
    },
    title: {
      fontFamily: 'NotoSerifJP-Bold',
      fontSize: 18,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    description: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
      marginBottom: spacing.md,
    },
    detailsContainer: {
      marginTop: spacing.sm,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: spacing.sm,
    },
    detailIcon: {
      marginRight: spacing.sm,
      marginTop: 2,
    },
    detailText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.text,
      flex: 1,
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
    expandButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    expandText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.primary,
    },
    directionsButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    directionsText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.invertedText,
      marginRight: spacing.xs,
    },
  });

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'dining': return t('explore.dining');
      case 'attractions': return t('explore.attractions');
      case 'nature': return t('explore.nature');
      default: return category;
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: location.image }} style={styles.image} />
        
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>
            {getCategoryName(location.category)}
          </Text>
        </View>
        
        <View style={styles.distanceTag}>
          <MapPin size={12} color="#FFFFFF" />
          <Text style={styles.distanceText}>{location.distance} km</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {language === 'en' ? location.nameEn : location.name}
        </Text>
        
        <Text style={styles.description} numberOfLines={expanded ? undefined : 2}>
          {language === 'en' ? location.descriptionEn : location.description}
        </Text>
        
        {expanded && (
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <MapPin size={16} color={colors.accent} style={styles.detailIcon} />
              <Text style={styles.detailText}>{location.address}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Clock size={16} color={colors.accent} style={styles.detailIcon} />
              <Text style={styles.detailText}>{location.openHours}</Text>
            </View>
            
            {location.phone && (
              <View style={styles.detailRow}>
                <Phone size={16} color={colors.accent} style={styles.detailIcon} />
                <Text style={styles.detailText}>{location.phone}</Text>
              </View>
            )}
            
            {location.website && (
              <View style={styles.detailRow}>
                <Globe size={16} color={colors.accent} style={styles.detailIcon} />
                <Text style={styles.detailText}>{location.website}</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
            <Text style={styles.expandText}>
              {expanded ? t('explore.showLess') : t('explore.showMore')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.directionsButton}>
            <Text style={styles.directionsText}>{t('explore.directions')}</Text>
            <ExternalLink size={16} color={colors.invertedText} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}