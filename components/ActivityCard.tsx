import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Activity } from '../constants/types';

export default function ActivityCard({ item }: { item: Activity }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <View style={styles.cardMeta}>
          <FontAwesome6 name="clock" size={12} color="#888" />
          <Text style={styles.metaText}>
            {new Date(item.date).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
          </Text>
        </View>
      </View>
      <View style={styles.caloriesBadge}>
        <FontAwesome6 name="fire" size={12} color="#FF6F00" />
        <Text style={styles.caloriesText}>{item.calories} kcal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', borderRadius: 16, padding: 15, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  cardImage: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#EEE', marginRight: 15 },
  cardContent: { flex: 1 },
  activityTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  cardMeta: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 12, color: '#888', marginLeft: 4 },
  caloriesBadge: { backgroundColor: '#FFF3E0', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  caloriesText: { fontSize: 14, fontWeight: '700', color: '#FF6F00', marginLeft: 4 },
});