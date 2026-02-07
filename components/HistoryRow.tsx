import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Activity } from '../constants/types';

export default function HistoryRow({ item, onDelete }: { item: Activity, onDelete: (id: string) => void }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString('th-TH')}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.cal}>{item.calories}</Text>
        <Text style={styles.unit}>kcal</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.delBtn}>
        <FontAwesome6 name="trash-can" size={16} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderRadius: 12, marginBottom: 10, elevation: 1 },
  thumb: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#EEE', marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  date: { fontSize: 12, color: '#888', marginTop: 2 },
  meta: { alignItems: 'flex-end', marginRight: 15 },
  cal: { fontSize: 16, fontWeight: 'bold', color: '#FF6F00' },
  unit: { fontSize: 10, color: '#888' },
  delBtn: { padding: 8 }
});