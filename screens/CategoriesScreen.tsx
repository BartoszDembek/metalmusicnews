import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { NewsItem, Category } from '../types/NewsItem';
import NewsCard from '../components/NewsCard';

interface CategoriesScreenProps {
  onBackPress: () => void;
  onNewsPress: (news: NewsItem) => void;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Breaking News',
    icon: 'flash',
    color: colors.primary,
    newsCount: 12
  },
  {
    id: '2',
    name: 'Album Reviews',
    icon: 'disc',
    color: colors.accent,
    newsCount: 8
  },
  {
    id: '3',
    name: 'Live Shows',
    icon: 'musical-notes',
    color: colors.metalSilver,
    newsCount: 15
  },
  {
    id: '4',
    name: 'Interviews',
    icon: 'mic',
    color: colors.metalCopper,
    newsCount: 6
  },
  {
    id: '5',
    name: 'New Releases',
    icon: 'play-circle',
    color: colors.success,
    newsCount: 10
  },
  {
    id: '6',
    name: 'Festival News',
    icon: 'people',
    color: colors.warning,
    newsCount: 4
  }
];

const mockCategoryNews: NewsItem[] = [
  {
    id: '4',
    title: 'Slipknot Reveals New Masks for 2024 Tour',
    summary: 'The masked metal giants unveil their latest terrifying designs.',
    content: 'Slipknot has revealed their new mask designs...',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    category: 'Breaking News',
    author: 'Metal Mike',
    publishedAt: '2024-01-12',
    readTime: 2,
    tags: ['Slipknot', 'Masks', 'Tour'],
    source: 'Metal Injection'
  },
  {
    id: '5',
    title: 'Tool\'s New Album Gets Perfect Score',
    summary: 'Critics praise the progressive metal masterpiece.',
    content: 'Tool\'s latest album has received universal acclaim...',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    category: 'Album Reviews',
    author: 'Sarah Steel',
    publishedAt: '2024-01-11',
    readTime: 5,
    tags: ['Tool', 'Album Review', 'Progressive Metal'],
    source: 'Pitchfork'
  }
];

export default function CategoriesScreen({ onBackPress, onNewsPress }: CategoriesScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textWhite} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CATEGORIES</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories Grid */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <Ionicons name={category.icon as any} size={32} color={colors.textWhite} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.newsCount} articles</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured from Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 FEATURED FROM CATEGORIES</Text>
          {mockCategoryNews.map((news) => (
            <NewsCard 
              key={news.id}
              news={news} 
              onPress={() => onNewsPress(news)}
            />
          ))}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textWhite,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 16,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.backgroundGray,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    color: colors.textGray,
    fontSize: 12,
  },
  section: {
    marginTop: 32,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: 16,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
