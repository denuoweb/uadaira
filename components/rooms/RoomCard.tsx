import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Users, Maximize, ArrowRight, Check } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';

type RoomProps = {
  room: {
    id: string;
    name: string;
    nameEn: string;
    type: string;
    price: number;
    capacity: number;
    size: number;
    description: string;
    descriptionEn: string;
    amenities: string[];
    images: string[];
    available: boolean;
  };
  checkInDate: Date;
  checkOutDate: Date;
};

export default function RoomCard({ room, checkInDate, checkOutDate }: RoomProps) {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = room.price * nights;

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
      height: 180,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.background,
      marginHorizontal: 2,
    },
    imageDotActive: {
      backgroundColor: colors.primary,
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    imagePagination: {
      position: 'absolute',
      bottom: spacing.sm,
      alignSelf: 'center',
      flexDirection: 'row',
    },
    contentContainer: {
      padding: spacing.md,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    title: {
      fontFamily: 'NotoSerifJP-Bold',
      fontSize: 18,
      color: colors.text,
    },
    priceText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 16,
      color: colors.text,
    },
    pricePerNight: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
    infoRow: {
      flexDirection: 'row',
      marginTop: spacing.xs,
      marginBottom: spacing.sm,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    infoText: {
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
    amenitiesContainer: {
      marginBottom: spacing.md,
    },
    amenityRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    amenityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: spacing.md,
      marginBottom: spacing.xs,
      width: '45%',
    },
    amenityText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      color: colors.text,
      marginLeft: spacing.xs,
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: spacing.md,
      marginTop: spacing.xs,
    },
    totalLabel: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.textSecondary,
    },
    totalPrice: {
      fontFamily: 'NotoSansJP-Bold',
      fontSize: 18,
      color: colors.text,
    },
    bookButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    bookButtonText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.invertedText,
      marginRight: spacing.xs,
    },
    roomType: {
      position: 'absolute',
      top: spacing.md,
      left: spacing.md,
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
      borderRadius: 16,
    },
    roomTypeText: {
      color: colors.invertedText,
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 12,
    },
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return '📶';
      case 'private-bath': return '🛁';
      case 'shared-bath': return '♨️';
      case 'aircon': return '❄️';
      case 'futon': return '🛌';
      case 'bed': return '🛏️';
      case 'tea-set': return '🍵';
      case 'tv': return '📺';
      case 'refrigerator': return '🧊';
      case 'private-veranda': return '🏞️';
      case 'sofa': return '🛋️';
      case 'shared-lounge': return '🪑';
      case 'lockers': return '🔒';
      default: return '✓';
    }
  };

  const getAmenityName = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return t('rooms.amenities.wifi');
      case 'private-bath': return t('rooms.amenities.privateBath');
      case 'shared-bath': return t('rooms.amenities.sharedBath');
      case 'aircon': return t('rooms.amenities.aircon');
      case 'futon': return t('rooms.amenities.futon');
      case 'bed': return t('rooms.amenities.bed');
      case 'tea-set': return t('rooms.amenities.teaSet');
      case 'tv': return t('rooms.amenities.tv');
      case 'refrigerator': return t('rooms.amenities.refrigerator');
      case 'private-veranda': return t('rooms.amenities.veranda');
      case 'sofa': return t('rooms.amenities.sofa');
      case 'shared-lounge': return t('rooms.amenities.lounge');
      case 'lockers': return t('rooms.amenities.lockers');
      default: return amenity;
    }
  };

  const getRoomTypeName = (type: string) => {
    switch (type) {
      case 'traditional': return t('rooms.traditional');
      case 'modern': return t('rooms.modern');
      case 'shared': return t('rooms.shared');
      default: return type;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={room.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        
        <View style={styles.roomType}>
          <Text style={styles.roomTypeText}>
            {getRoomTypeName(room.type)}
          </Text>
        </View>
        
        <View style={styles.imagePagination}>
          {room.images.map((_, index) => (
            <View 
              key={index} 
              style={[styles.imageDot, index === 0 && styles.imageDotActive]} 
            />
          ))}
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>
            {language === 'en' ? room.nameEn : room.name}
          </Text>
          <View>
            <Text style={styles.priceText}>¥{room.price.toLocaleString()}</Text>
            <Text style={styles.pricePerNight}>{t('rooms.perNight')}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Users size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{room.capacity} {t('rooms.guests')}</Text>
          </View>
          <View style={styles.infoItem}>
            <Maximize size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{room.size} m²</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={4}>
          {language === 'en' ? room.descriptionEn : room.description}
        </Text>
        
        <View style={styles.amenitiesContainer}>
          <View style={styles.amenityRow}>
            {room.amenities.slice(0, 6).map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Text>{getAmenityIcon(amenity)}</Text>
                <Text style={styles.amenityText}>
                  {getAmenityName(amenity)}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.totalContainer}>
          <View>
            <Text style={styles.totalLabel}>{t('rooms.total')} ({nights} {nights === 1 ? t('rooms.night') : t('rooms.nights')})</Text>
            <Text style={styles.totalPrice}>¥{totalPrice.toLocaleString()}</Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>{t('rooms.book')}</Text>
            <ArrowRight size={16} color={colors.invertedText} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}