import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import HomeScreen from './screens/HomeScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import SearchScreen from './screens/SearchScreen';
import { colors } from './theme/colors';
import { NewsItem } from './types/NewsItem';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'detail' | 'categories' | 'search'>('home');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'metal-font': require('./assets/fonts/metal-font.ttf'),
      });
    } catch (error) {
      console.log('Font loading failed:', error);
    } finally {
      setFontsLoaded(true);
    }
  };

  const navigateToDetail = (news: NewsItem) => {
    setSelectedNews(news);
    setCurrentScreen('detail');
  };

  const navigateBack = () => {
    setCurrentScreen('home');
    setSelectedNews(null);
  };

  const navigateToCategories = () => {
    setCurrentScreen('categories');
  };

  const navigateToSearch = () => {
    setCurrentScreen('search');
  };

  if (!fontsLoaded) {
    return (
      <LinearGradient
        colors={[colors.backgroundDark, colors.backgroundBlack]}
        style={styles.loadingContainer}
      />
    );
  }

  return (
    <LinearGradient
      colors={[colors.backgroundDark, colors.backgroundBlack]}
      style={styles.container}
    >
      <StatusBar style="light" backgroundColor={colors.backgroundBlack} />
      
      {currentScreen === 'home' && (
        <HomeScreen 
          onNewsPress={navigateToDetail}
          onCategoriesPress={navigateToCategories}
          onSearchPress={navigateToSearch}
        />
      )}
      
      {currentScreen === 'detail' && selectedNews && (
        <NewsDetailScreen 
          news={selectedNews}
          onBackPress={navigateBack}
        />
      )}
      
      {currentScreen === 'categories' && (
        <CategoriesScreen 
          onBackPress={navigateBack}
          onNewsPress={navigateToDetail}
        />
      )}
      
      {currentScreen === 'search' && (
        <SearchScreen 
          onBackPress={navigateBack}
          onNewsPress={navigateToDetail}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
