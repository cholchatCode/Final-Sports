import { Tabs } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#FF6F00' }}>
      <Tabs.Screen name="index" options={{ title: 'ภาพรวม', tabBarIcon: ({ color }) => <FontAwesome6 name="chart-pie" size={24} color={color} /> }} />
      <Tabs.Screen name="add" options={{ title: 'บันทึก', tabBarIcon: ({ color }) => <FontAwesome6 name="circle-plus" size={24} color={color} /> }} />
      <Tabs.Screen name="manage" options={{ title: 'ประวัติ', tabBarIcon: ({ color }) => <FontAwesome6 name="list-ul" size={24} color={color} /> }} />
    </Tabs>
  );
}