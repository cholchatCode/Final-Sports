import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Activity } from '../constants/types';

export default function ActivityCard({ item }: { item: Activity }) {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.calories} kcal</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <FontAwesome6 name="clock" size={12} color="#888" />
          <Text style={styles.timeText}>
            {new Date(item.date).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', borderRadius: 16, marginBottom: 15, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  image: { width: '100%', height: 150, backgroundColor: '#EEE' },
  content: { padding: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  badge: { backgroundColor: '#FFF3E0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#FF6F00', fontWeight: 'bold', fontSize: 14 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeText: { color: '#888', fontSize: 14 }
});