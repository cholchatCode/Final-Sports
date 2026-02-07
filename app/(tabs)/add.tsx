import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Imports
import QuickSelector from '../../components/QuickSelector';
import { Activity, QuickOption, STORAGE_KEY } from '../../constants/types';

export default function AddActivityScreen() {
  const router = useRouter();
  
  // State
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  
  const [image, setImage] = useState(''); 
  
  const [type, setType] = useState('ทั่วไป');
  const [date, setDate] = useState(new Date());
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  
  const quickOptions: QuickOption[] = [
    { label: 'วิ่ง', icon: 'person-running', color: '#FF6F00', image: 'https://hips.hearstapps.com/hmg-prod/images/running-is-one-of-the-best-ways-to-stay-fit-royalty-free-image-1036780592-1553033495.jpg' },
    { label: 'ปั่นจักรยาน', icon: 'bicycle', color: '#00897B', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80' },
    { label: 'ฟิตเนส', icon: 'dumbbell', color: '#7B1FA2', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80' },
    { label: 'ว่ายน้ำ', icon: 'person-swimming', color: '#1E88E5', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80' },
  ];

  const handleQuickSelect = (opt: QuickOption) => {
    setTitle(opt.label); // ใส่ชื่ออัตโนมัติ
    setType(opt.label);  // ใส่ประเภทอัตโนมัติ
    setImage(opt.image) // ใส่รูปภาคอัตโนมัติ
  };

  const handleSave = async () => {
    if (!title || !calories) {
        Alert.alert('ข้อมูลไม่ครบ', 'กรุณากรอกชื่อและแคลอรี่');
        return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      title,
      calories: parseFloat(calories),
      image, // ใช้ URL ที่ user กรอกในช่อง Input
      date: date.toISOString(),
      type
    };

    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const data = existing ? JSON.parse(existing) : [];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newActivity, ...data]));
      
      Alert.alert('สำเร็จ', 'บันทึกเรียบร้อย', [{ text: 'ตกลง', onPress: () => router.push('/(tabs)') }]);
      
      // Reset
      setTitle(''); 
      setCalories(''); 
      setImage('https://via.placeholder.com/300x200');
    } catch (e) {
      Alert.alert('Error', 'บันทึกไม่ได้');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.header}>บันทึกกิจกรรม</Text>
        
        {/* 1. ปุ่มเลือกด่วน (Icon + Text) */}
        <Text style={styles.label}>เลือกประเภทกีฬา</Text>
        <QuickSelector options={quickOptions} onSelect={handleQuickSelect} />

        <Text style={styles.label}>รายละเอียด</Text>

        {/* 2. ช่องกรอก URL รูปภาพ */}
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>URL รูปภาพ</Text>
            <TextInput 
                style={styles.input} 
                value={image} 
                onChangeText={setImage} 
                placeholder="วางลิ้งค์รูปภาพที่นี่..." 
            />
        </View>

        {/* 3. Preview รูปจาก Link */}
        {image ? (
            <Image source={{ uri: image }} style={styles.preview} resizeMode="cover" />
        ) : null}

        {/* 4. ชื่อกิจกรรม (Auto-fill ได้) */}
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ชื่อกิจกรรม</Text>
            <TextInput 
                style={styles.input} 
                value={title} 
                onChangeText={setTitle} 
                placeholder="เช่น วิ่งสวนลุม" 
            />
        </View>

        {/* 5. แคลอรี่ */}
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>แคลอรี่ (kcal)</Text>
            <TextInput 
                style={styles.input} 
                value={calories} 
                onChangeText={setCalories} 
                keyboardType="numeric" 
                placeholder="0" 
            />
        </View>

        {/* 6. วันที่และเวลา */}
        <Text style={styles.label}>วันที่และเวลา</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateBtn}>
             <FontAwesome6 name="calendar-days" size={16} color="#555" />
             <Text style={{marginLeft: 8}}>{date.toLocaleDateString('th-TH')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateBtn}>
             <FontAwesome6 name="clock" size={16} color="#555" />
             <Text style={{marginLeft: 8}}>{date.toLocaleTimeString('th-TH', {hour:'2-digit', minute:'2-digit'})}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && <DateTimePicker value={date} mode="date" onChange={(_, d) => { setShowDatePicker(false); if(d) setDate(d); }} />}
        {showTimePicker && <DateTimePicker value={date} mode="time" onChange={(_, d) => { setShowTimePicker(false); if(d) setDate(d); }} />}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>บันทึกข้อมูล</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 10, marginTop: 10, color: '#333' },
  
  inputGroup: { marginBottom: 15 },
  inputLabel: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD', fontSize: 16 },
  
  preview: { width: '100%', height: 180, borderRadius: 10, backgroundColor: '#DDD', marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
  
  dateBtn: { flex: 1, flexDirection: 'row', backgroundColor: 'white', padding: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DDD' },
  
  saveBtn: { backgroundColor: '#FF6F00', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#FF6F00', shadowOffset: {width:0, height:4}, shadowOpacity:0.3, elevation:5 },
  saveText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});