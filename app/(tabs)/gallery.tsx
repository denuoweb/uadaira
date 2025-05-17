import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/hooks/useTranslation';
import { mockGalleryData } from '@/data/galleryData';
import PhotoModal from '@/components/gallery/PhotoModal';

const { width } = Dimensions.get('window');
const numColumns = 2;
const tileSize = width / numColumns;

export default function GalleryScreen() {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    filterContainer: {
      flexDirection: 'row',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    categoryChip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 16,
      marginRight: spacing.sm,
      borderWidth: 1,
    },
    categoryText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 13,
    },
    gridContainer: {
      flex: 1,
    },
    photoTile: {
      width: tileSize,
      height: tileSize,
      padding: 2,
    },
    photo: {
      width: '100%',
      height: '100%',
      borderRadius: 4,
    },
    noPhotosContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    noPhotosText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.lg,
    },
  });

  const categories = [
    { id: 'all', name: t('gallery.allCategories') },
    { id: 'event', name: t('gallery.events') },
    { id: 'accommodation', name: t('gallery.accommodation') },
    { id: 'scenery', name: t('gallery.scenery') },
    { id: 'food', name: t('gallery.food') },
  ];

  const filteredPhotos = mockGalleryData.filter(
    photo => categoryFilter === 'all' || photo.category === categoryFilter
  );

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
      <Header title={t('gallery.title')} />
      
      <View style={styles.filterContainer}>
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

      {filteredPhotos.length > 0 ? (
        <FlatList
          data={filteredPhotos}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.photoTile}
              onPress={() => setSelectedPhoto(item)}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.photo}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.gridContainer}
        />
      ) : (
        <View style={styles.noPhotosContainer}>
          <Image 
            source={require('@/assets/images/no-photos.png')} 
            style={{ width: 120, height: 120, opacity: 0.7 }}
            resizeMode="contain"
          />
          <Text style={styles.noPhotosText}>{t('gallery.noPhotos')}</Text>
        </View>
      )}

      {selectedPhoto && (
        <PhotoModal 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </View>
  );
}