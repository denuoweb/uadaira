import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import RoomCard from '@/components/rooms/RoomCard';
import DateSelector from '@/components/rooms/DateSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { mockRoomData } from '@/data/roomData';

export default function RoomsScreen() {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000)); // Tomorrow
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    dateContainer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filterContainer: {
      flexDirection: 'row',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: colors.background,
    },
    roomTypeButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 16,
      marginRight: spacing.sm,
      borderWidth: 1,
    },
    roomTypeText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 13,
    },
    listContainer: {
      flex: 1,
      padding: spacing.md,
    },
    infoContainer: {
      padding: spacing.lg,
      backgroundColor: colors.cardSecondary,
      marginHorizontal: spacing.lg,
      marginTop: spacing.md,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: colors.accent,
    },
    infoText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    emptyText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.lg,
    },
  });

  const roomTypes = [
    { id: 'all', name: t('rooms.allTypes') },
    { id: 'traditional', name: t('rooms.traditional') },
    { id: 'modern', name: t('rooms.modern') },
    { id: 'shared', name: t('rooms.shared') },
  ];

  const filteredRooms = mockRoomData.filter(room => 
    roomTypeFilter === 'all' || room.type === roomTypeFilter
  );

  const RoomTypeButton = ({ type, selected }) => (
    <TouchableOpacity
      style={[
        styles.roomTypeButton, 
        { 
          backgroundColor: selected ? colors.primary : 'transparent',
          borderColor: selected ? colors.primary : colors.border,
        }
      ]}
      onPress={() => setRoomTypeFilter(type.id)}
    >
      <Text 
        style={[
          styles.roomTypeText, 
          { color: selected ? colors.invertedText : colors.text }
        ]}
      >
        {type.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={t('rooms.title')} />
      
      <View style={styles.dateContainer}>
        <DateSelector 
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onCheckInChange={setCheckInDate}
          onCheckOutChange={setCheckOutDate}
        />
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={roomTypes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RoomTypeButton 
              type={item} 
              selected={roomTypeFilter === item.id} 
            />
          )}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {t('rooms.bookingInfo')}
        </Text>
      </View>

      {filteredRooms.length > 0 ? (
        <FlatList
          data={filteredRooms}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RoomCard 
              room={item} 
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image 
            source={require('@/assets/images/no-rooms.png')} 
            style={{ width: 120, height: 120, opacity: 0.7 }}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>{t('rooms.noRooms')}</Text>
        </View>
      )}
    </View>
  );
}