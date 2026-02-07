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
    if (json) {
        const parsed = JSON.parse(json);
        parsed.sort((a: Activity, b: Activity) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setData(parsed);
    }
  };

  useFocusEffect(useCallback(() => { loadData(); }, []));

  const handleDelete = (id: string) => {
    Alert.alert("ยืนยัน", "ต้องการลบรายการนี้?", [
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
      <View style={{ padding: 20, backgroundColor: 'white', elevation: 2 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>จัดการประวัติ</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <HistoryRow item={item} onDelete={handleDelete} />}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={<Text style={{textAlign:'center', marginTop:50, color:'#999'}}>ยังไม่มีข้อมูล</Text>}
      />
    </SafeAreaView>
  );
}