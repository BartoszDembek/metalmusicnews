import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { NewsItem } from '../types/NewsItem';
import NewsCard from '../components/NewsCard';

interface SearchScreenProps {
  onBackPress: () => void;
  onNewsPress: (news: NewsItem) => void;
}

const mockSearchResults: NewsItem[] = [
  {
    id: '6',
    title: 'Megadeth Announces Farewell Tour',
    summary: 'The thrash metal legends prepare for their final tour.',
    content: 'Megadeth has announced what they claim will be their farewell tour...',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
    category: 'Tours',
    author: 'Rock Reporter',
    publishedAt: '2024-01-10',
    readTime: 3,
    tags: ['Megadeth', 'Farewell Tour', 'Thrash Metal'],
    source: 'Blabbermouth'
  },
  {
    id: '7',
    title: 'Ozzy Osbourne Health Update',
    summary: 'The Prince of Darkness shares latest health news with fans.',
    content: 'Ozzy Osbourne has provided an update on his health condition...',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400',
    category: 'News',
    author: 'Metal Mike',
    publishedAt: '2024-01-09',
    readTime: 2,
    tags: ['Ozzy Osbourne', 'Health', 'Black Sabbath'],
    source: 'Ultimate Guitar'
  }
];

const popularSearches = [
  'Metallica', 'Iron Maiden', 'Black Sabbath', 'Slipknot', 'Tool',
  'Megadeth', 'Ozzy Osbourne', 'Death Metal', 'Thrash Metal', 'Progressive Metal'
];

export default function SearchScreen({ onBackPress, onNewsPress }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      if (query.trim()) {
        setSearchResults(mockSearchResults);
      } else {
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 500);
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    handleSearch(term);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textWhite} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search metal news..."
            placeholderTextColor={colors.textGray}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
              <Ionicons name="close" size={20} color={colors.textGray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!searchQuery && (
          <>
            {/* Popular Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔥 POPULAR SEARCHES</Text>
              <View style={styles.tagsContainer}>
                {popularSearches.map((term, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.popularTag}
                    onPress={() => handlePopularSearch(term)}
                  >
                    <Text style={styles.popularTagText}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Recent Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⏱️ RECENT SEARCHES</Text>
              <View style={styles.recentSearches}>
                <TouchableOpacity style={styles.recentSearchItem}>
                  <Ionicons name="time-outline" size={16} color={colors.textGray} />
                  <Text style={styles.recentSearchText}>Metallica new album</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.recentSearchItem}>
                  <Ionicons name="time-outline" size={16} color={colors.textGray} />
                  <Text style={styles.recentSearchText}>Iron Maiden tour</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.recentSearchItem}>
                  <Ionicons name="time-outline" size={16} color={colors.textGray} />
                  <Text style={styles.recentSearchText}>Death metal bands</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {/* Search Results */}
        {searchQuery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isSearching ? '🔍 SEARCHING...' : `🎯 RESULTS FOR "${searchQuery}"`}
            </Text>
            
            {isSearching ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Searching the metal archives...</Text>
              </View>
            ) : searchResults.length > 0 ? (
              searchResults.map((news) => (
                <NewsCard 
                  key={news.id}
                  news={news} 
                  onPress={() => onNewsPress(news)}
                />
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search" size={48} color={colors.textGray} />
                <Text style={styles.noResultsText}>No results found</Text>
                <Text style={styles.noResultsSubtext}>Try searching for bands, albums, or genres</Text>
              </View>
            )}
          </View>
        )}
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundGray,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.textWhite,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: 16,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  popularTag: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  popularTagText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  recentSearches: {
    gap: 12,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  recentSearchText: {
    color: colors.textGray,
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: colors.textGray,
    fontSize: 16,
    fontStyle: 'italic',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  noResultsSubtext: {
    color: colors.textGray,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
