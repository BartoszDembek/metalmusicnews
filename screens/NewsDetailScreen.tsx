import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { NewsItem } from '../types/NewsItem';

interface NewsDetailScreenProps {
  news: NewsItem;
  onBackPress: () => void;
}

export default function NewsDetailScreen({ news, onBackPress }: NewsDetailScreenProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.summary}`,
        title: news.title,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textWhite} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.textWhite} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image source={{ uri: news.imageUrl }} style={styles.heroImage} />
        
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{news.category.toUpperCase()}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{news.title}</Text>

        {/* Meta Info */}
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="person-outline" size={16} color={colors.textGray} />
            <Text style={styles.metaText}>{news.author}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={colors.textGray} />
            <Text style={styles.metaText}>{news.readTime} min read</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color={colors.textGray} />
            <Text style={styles.metaText}>{news.publishedAt}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summary}>{news.summary}</Text>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>
            {news.content}
            {'\n\n'}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            {'\n\n'}
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            {'\n\n'}
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Tags:</Text>
          <View style={styles.tags}>
            {news.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Source */}
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceText}>Source: {news.source}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundGray,
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: 220,
    left: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginHorizontal: 16,
    marginTop: 24,
    lineHeight: 34,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: colors.textGray,
    fontSize: 14,
  },
  summaryContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  summary: {
    color: colors.textWhite,
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  contentContainer: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  contentText: {
    color: colors.textGray,
    fontSize: 16,
    lineHeight: 26,
  },
  tagsContainer: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  tagsTitle: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  tagText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  sourceContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundGray,
  },
  sourceText: {
    color: colors.textDark,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
