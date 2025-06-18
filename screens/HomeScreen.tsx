import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { NewsItem } from '../types/NewsItem';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import CategoryButton from '../components/CategoryButton';

interface HomeScreenProps {
  onNewsPress: (news: NewsItem) => void;
  onCategoriesPress: () => void;
  onSearchPress: () => void;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Metallica Announces New Album "72 Seasons"',
    summary: 'The metal legends are back with their first studio album in 6 years, promising a return to their thrash roots.',
    content: 'Metallica has officially announced their highly anticipated new album...',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    category: 'News',
    author: 'Metal Mike',
    publishedAt: '2024-01-15',
    readTime: 3,
    tags: ['Metallica', 'New Album', 'Thrash Metal'],
    source: 'Metal Hammer'
  },
  {
    id: '2',
    title: 'Iron Maiden World Tour 2024 Dates Revealed',
    summary: 'The British heavy metal icons announce massive world tour with special guests.',
    content: 'Iron Maiden has revealed the dates for their upcoming world tour...',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400',
    category: 'Tours',
    author: 'Sarah Steel',
    publishedAt: '2024-01-14',
    readTime: 2,
    tags: ['Iron Maiden', 'World Tour', 'Live'],
    source: 'Loudwire'
  },
  {
    id: '3',
    title: 'Black Sabbath Documentary Wins Grammy',
    summary: 'The legendary band\'s documentary takes home the award for Best Music Film.',
    content: 'Black Sabbath\'s documentary has been honored with a Grammy Award...',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
    category: 'Awards',
    author: 'Rock Reporter',
    publishedAt: '2024-01-13',
    readTime: 4,
    tags: ['Black Sabbath', 'Grammy', 'Documentary'],
    source: 'Rolling Stone'
  }
];

const categories = [
  { name: 'News', icon: 'newspaper-outline', color: colors.primary },
  { name: 'Reviews', icon: 'star-outline', color: colors.accent },
  { name: 'Tours', icon: 'musical-notes-outline', color: colors.metalSilver },
  { name: 'Interviews', icon: 'mic-outline', color: colors.metalCopper },
];

export default function HomeScreen({ onNewsPress, onCategoriesPress, onSearchPress }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="METAL NEWS"
        onSearchPress={onSearchPress}
        onMenuPress={onCategoriesPress}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured News */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 BREAKING NEWS</Text>
          <NewsCard 
            news={mockNews[0]} 
            onPress={() => onNewsPress(mockNews[0])}
            featured
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ CATEGORIES</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                name={category.name}
                icon={category.icon}
                color={category.color}
                onPress={onCategoriesPress}
              />
            ))}
          </ScrollView>
        </View>

        {/* Latest News */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🤘 LATEST NEWS</Text>
          {mockNews.slice(1).map((news) => (
            <NewsCard 
              key={news.id}
              news={news} 
              onPress={() => onNewsPress(news)}
            />
          ))}
        </View>

        {/* Trending Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 TRENDING</Text>
          <View style={styles.tagsContainer}>
            {['Metallica', 'Iron Maiden', 'Black Sabbath', 'Death Metal', 'Thrash', 'Progressive'].map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: 12,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  tagsContainer: {
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
    borderColor: colors.primary,
  },
  tagText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
});
