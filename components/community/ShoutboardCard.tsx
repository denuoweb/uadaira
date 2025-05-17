import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Heart, MessageSquare } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { format, formatDistanceToNow } from 'date-fns';
import { ja, enUS, zhCN, ko } from 'date-fns/locale';

type ShoutboardProps = {
  message: {
    id: string;
    content: string;
    contentEn: string;
    user: {
      name: string;
      nameEn: string;
      profileImage: string;
      isGuest: boolean;
    };
    date: string;
    likes: number;
    replies: number;
  };
};

export default function ShoutboardCard({ message }: ShoutboardProps) {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [liked, setLiked] = React.useState(false);
  
  // Get the appropriate date-fns locale based on current language
  const getLocale = () => {
    switch (language) {
      case 'ja': return ja;
      case 'zh': return zhCN;
      case 'ko': return ko;
      default: return enUS;
    }
  };
  
  const messageDate = new Date(message.date);
  const timeAgo = formatDistanceToNow(messageDate, { 
    addSuffix: true,
    locale: getLocale() 
  });

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
    contentContainer: {
      padding: spacing.md,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: spacing.sm,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 14,
      color: colors.text,
    },
    guestBadge: {
      backgroundColor: colors.accent,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
      marginLeft: spacing.xs,
    },
    guestBadgeText: {
      fontFamily: 'NotoSansJP-Medium',
      fontSize: 10,
      color: colors.invertedText,
    },
    timeAgo: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
    content: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
      marginBottom: spacing.md,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    actionText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 12,
      marginLeft: spacing.xs,
      color: colors.textSecondary,
    },
    actionTextActive: {
      color: colors.primary,
    },
  });

  const handleLike = () => {
    setLiked(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Image 
            source={{ uri: message.user.profileImage }} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.userName}>
                {language === 'en' ? message.user.nameEn : message.user.name}
              </Text>
              {message.user.isGuest && (
                <View style={styles.guestBadge}>
                  <Text style={styles.guestBadgeText}>{t('community.guest')}</Text>
                </View>
              )}
            </View>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>
        </View>
        
        <Text style={styles.content}>
          {language === 'en' ? message.contentEn : message.content}
        </Text>
        
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Heart 
              size={16} 
              color={liked ? colors.primary : colors.textSecondary}
              fill={liked ? colors.primary : 'none'}
            />
            <Text 
              style={[
                styles.actionText, 
                liked && styles.actionTextActive
              ]}
            >
              {liked ? message.likes + 1 : message.likes}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MessageSquare size={16} color={colors.textSecondary} />
            <Text style={styles.actionText}>{message.replies}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}