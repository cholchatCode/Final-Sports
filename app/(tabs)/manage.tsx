import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import HistoryRow from '../../components/HistoryRow';
import { Activity, STORAGE_KEY } from '../../constants/types';

export default function ManageScreen() {
  const [data, setData] = useState<Activity[]>([]);

  const loadData = async () => {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) setData(JSON.parse(json));
  };

  useFocusEffect(useCallback(() => { loadData(); }, []));

  const handleDelete = (id: string) => {
    Alert.alert("ลบข้อมูล", "ยืนยันการลบ?", [
      { text: "ยกเลิก" },
      { text: "ลบ", style: "destructive", onPress: async () => {
          const newData = data.filter(i => i.id !== id);
          setData(newData);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      }}
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 20 }}>ประวัติทั้งหมด</Text>
      <FlatList
        data={data}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <HistoryRow item={item} onDelete={handleDelete} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  );
}