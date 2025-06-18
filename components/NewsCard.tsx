
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { NewsItem } from '../types/NewsItem';

interface NewsCardProps {
  news: NewsItem;
  onPress: () => void;
  featured?: boolean;
}

const { width } = Dimensions.get('window');

export default function NewsCard({ news, onPress, featured = false }: NewsCardProps) {
  if (featured) {
    return (
      <TouchableOpacity style={styles.featuredCard} onPress={onPress}>
        <Image source={{ uri: news.imageUrl }} style={styles.featuredImage} />
        <View style={styles.featuredOverlay}>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>{news.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.featuredTitle}>{news.title}</Text>
          <Text style={styles.featuredSummary}>{news.summary}</Text>
          <View style={styles.featuredMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="person