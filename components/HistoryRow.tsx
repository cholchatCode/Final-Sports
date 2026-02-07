import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Activity } from '../constants/types';

interface Props {
  item: Activity;
  onDelete: (id: string) => void;
}

export default function HistoryRow({ item, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.iconBox}>
           <FontAwesome6 name="clock-rotate-left" size={16} color="#006064" /> 
        </View>
        <View>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowDate}>
            {new Date(item.date).toLocaleDateString('th-TH')}
          </Text>
        </View>
      </View>
      
      <View style={styles.rowRight}>
        <Text style={styles.rowCalories}>{item.calories} kcal</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
          <FontAwesome6 name="trash-can" size={18} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0F7FA', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rowTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  rowDate: { fontSize: 12, color: '#888' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  rowCalories: { fontSize: 14, fontWeight: 'bold', color: '#333', marginRight: 15 },
  deleteBtn: { padding: 8 },
});