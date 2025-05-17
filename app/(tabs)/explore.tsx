import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/hooks/useTranslation';
import { Map as MapIcon, Coffee, Landmark, MapPin } from 'lucide-react-native';
import { mockLocationData } from '@/data/locationData';
import LocationCard from '@/components/explore/LocationCard';

export default function ExploreScreen() {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();
  const [categoryFilter, setCategoryFilter] = useState('all');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    mapPreviewContainer: {
      height: 200,
      position: 'relative',
      backgroundColor: colors.cardSecondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapText: {
      fontFamily: 'NotoSansJP-Bold',
      color: '#fff',
      fontSize: 18,
      marginTop: spacing.md,
    },
    mapImage: {
      width: '100%',
      height: '100%',
    },
    categoryContainer: {
      flexDirection: 'row',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    categoryButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 16,
      marginRight: spacing.sm,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 13,
      marginLeft: spacing.xs,
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
    { 
      id: 'all', 
      name: t('explore.allPlaces'),
      icon: (color) => <MapPin size={16} color={color} />
    },
    { 
      id: 'dining', 
      name: t('explore.dining'),
      icon: (color) => <Coffee size={16} color={color} />
    },
    { 
      id: 'attractions', 
      name: t('explore.attractions'),
      icon: (color) => <Landmark size={16} color={color} />
    },
    { 
      id: 'nature', 
      name: t('explore.nature'),
      icon: (color) => <MapIcon size={16} color={color} />
    },
  ];

  const filteredLocations = mockLocationData.filter(location => 
    categoryFilter === 'all' || location.category === categoryFilter
  );

  const CategoryButton = ({ category, selected }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton, 
        { 
          backgroundColor: selected ? colors.primary : 'transparent',
          borderColor: selected ? colors.primary : colors.border,
        }
      ]}
      onPress={() => setCategoryFilter(category.id)}
    >
      {category.icon(selected ? colors.invertedText : colors.text)}
      <Text 
        style={[
          styles.categoryText, 
          { color: selected ? colors.invertedText : colors.text }
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={t('explore.title')} />
      
      <View style={styles.mapPreviewContainer}>
        <Image
          source={require('@/assets/images/map-preview.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <View style={styles.mapOverlay}>
          <MapIcon size={32} color="#fff" />
          <Text style={styles.mapText}>{t('explore.viewFullMap')}</Text>
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CategoryButton 
              category={item} 
              selected={categoryFilter === item.id} 
            />
          )}
        />
      </View>

      {filteredLocations.length > 0 ? (
        <FlatList
          data={filteredLocations}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <LocationCard location={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image 
            source={require('@/assets/images/no-locations.png')} 
            style={{ width: 120, height: 120, opacity: 0.7 }}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>{t('explore.noLocations')}</Text>
        </View>
      )}
    </View>
  );
}