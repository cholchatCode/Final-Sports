import React, { useState, useCallback } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
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
          const dateTitle = new Date(item.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'long' });
          if (!acc[dateTitle]) acc[dateTitle] = [];
          acc[dateTitle].push(item);
          return acc;
        }, {});

        setSections(Object.keys(grouped).map(key => ({ title: key, data: grouped[key] })));
      })();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 16, color: '#666' }}>เผาผลาญไปแล้ว 🔥</Text>
        <Text style={{ fontSize: 40, fontWeight: '800' }}>{total.toLocaleString()} kcal</Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ActivityCard item={item} />}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { padding: 30, backgroundColor: 'white', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center', elevation: 5 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#444' }
});