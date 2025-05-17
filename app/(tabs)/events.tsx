import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import EventCard from '@/components/events/EventCard';
import CalendarStrip from 'react-native-calendar-strip';
import { useTranslation } from '@/hooks/useTranslation';
import { Filter } from 'lucide-react-native';
import { mockEventData } from '@/data/eventData';

export default function EventsScreen() {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryFilter, setCategoryFilter] = useState('all');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    calendarContainer: {
      paddingTop: spacing.md,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    filterText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: spacing.xs,
    },
    categoryContainer: {
      flexDirection: 'row',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      backgroundColor: colors.background,
    },
    categoryChip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 16,
      marginRight: spacing.sm,
      borderWidth: 1,
    },
    categoryChipText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 13,
    },
    listContainer: {
      flex: 1,
      padding: spacing.md,
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

  const categories = [
    { id: 'all', name: t('events.allCategories') },
    { id: 'workshop', name: t('events.workshop') },
    { id: 'healing', name: t('events.healing') },
    { id: 'community', name: t('events.community') },
    { id: 'culinary', name: t('events.culinary') },
  ];

  const filteredEvents = mockEventData.filter(event => {
    const eventDate = new Date(event.date);
    const isSameDay = eventDate.toDateString() === selectedDate.toDateString();
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    return isSameDay && matchesCategory;
  });

  const CategoryChip = ({ category, selected }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip, 
        { 
          backgroundColor: selected ? colors.primary : 'transparent',
          borderColor: selected ? colors.primary : colors.border,
        }
      ]}
      onPress={() => setCategoryFilter(category.id)}
    >
      <Text 
        style={[
          styles.categoryChipText, 
          { color: selected ? colors.invertedText : colors.text }
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={t('events.title')} />
      
      <View style={styles.calendarContainer}>
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'background',
            duration: 200,
            highlightColor: colors.primary,
          }}
          style={{ height: 100, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: colors.text, fontFamily: 'NotoSerifJP-Medium' }}
          dateNumberStyle={{ color: colors.text, fontFamily: 'NotoSansJP-Regular' }}
          dateNameStyle={{ color: colors.textSecondary, fontFamily: 'NotoSansJP-Regular' }}
          highlightDateNumberStyle={{ color: colors.invertedText, fontFamily: 'NotoSansJP-Bold' }}
          highlightDateNameStyle={{ color: colors.invertedText, fontFamily: 'NotoSansJP-Bold' }}
          iconContainer={{ flex: 0.1 }}
          onDateSelected={date => setSelectedDate(date.toDate())}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={18} color={colors.textSecondary} />
          <Text style={styles.filterText}>{t('events.filter')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CategoryChip 
              category={item} 
              selected={categoryFilter === item.id} 
            />
          )}
        />
      </View>

      {filteredEvents.length > 0 ? (
        <FlatList
          data={filteredEvents}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image 
            source={require('@/assets/images/no-events.png')} 
            style={{ width: 120, height: 120, opacity: 0.7 }}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>{t('events.noEvents')}</Text>
        </View>
      )}
    </View>
  );
}