import React, { useState, useCallback } from 'react';
import { View, Text, SectionList, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import ActivityCard from '../../components/ActivityCard';
import { Activity, STORAGE_KEY } from '../../constants/types';

export default function Dashboard() {
  const [sections, setSections] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        const data: Activity[] = json ? JSON.parse(json) : [];
        setTotal(data.reduce((sum, item) => sum + item.calories, 0));

        const grouped = data.reduce((acc: any, item) => {
          const key = new Date(item.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'long' });
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {});
        
        // เรียงวันที่ล่าสุดขึ้นก่อน
        const sortedKeys = Object.keys(grouped).sort((a,b) => b.localeCompare(a));
        setSections(sortedKeys.map(key => ({ title: key, data: grouped[key] })));
      })();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.subHeader}>ผลลัพธ์การออกกำลังกาย</Text>
        <View style={styles.statBox}>
          <Text style={styles.totalLabel}>เผาผลาญรวม</Text>
          <Text style={styles.totalValue}>{total.toLocaleString()}</Text>
          <Text style={styles.unit}>kcal</Text>
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ActivityCard item={item} />}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { padding: 25, backgroundColor: 'white', paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 5 },
  subHeader: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 10 },
  statBox: { alignItems: 'center' },
  totalLabel: { fontSize: 14, fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: 1 },
  totalValue: { fontSize: 48, fontWeight: '900', color: '#FF6F00', lineHeight: 55 },
  unit: { fontSize: 18, color: '#999', fontWeight: '500' },
  list: { padding: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#444', marginTop: 15, marginBottom: 10 }
});