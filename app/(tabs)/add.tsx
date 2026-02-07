import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import QuickSelector from '../../components/QuickSelector';
import { Activity, QuickOption, STORAGE_KEY } from '../../constants/types';

export default function AddActivityScreen() {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [image, setImage] = useState(''); 
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ✅ แก้ไขตรงนี้: เพิ่ม property 'image' ให้ครบทุกอัน (Error จะหายไป)
  const quickOptions: QuickOption[] = [
    { 
      label: 'บาสเกตบอล', 
      icon: 'basketball', 
      color: '#E65100', 
      defaultCalories: '450',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400' 
    },
    { 
      label: 'แบดมินตัน', 
      icon: 'medal', 
      color: '#00ACC1', 
      defaultCalories: '300',
      image: 'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      label: 'ฟุตบอล', 
      icon: 'futbol', 
      color: '#2E7D32', 
      defaultCalories: '500',
      image: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      label: 'วิ่ง/เดิน', 
      icon: 'person-running', 
      color: '#1E88E5', 
      defaultCalories: '250',
      image: 'https://www.healthywomen.org/media-library/fitness-woman-running-training-for-marathon-on-sunny-coast-trail.jpg?id=34353001&width=1200&height=800&quality=70&coordinates=110%2C0%2C110%2C0'
    },
  ];

  const handleQuickSelect = (opt: QuickOption) => {
    setTitle(opt.label);
    setCalories(opt.defaultCalories);
    // ✅ เพิ่มตรงนี้: ถ้าอยากให้กดแล้วรูปเด้งมาด้วย
    setImage(opt.image); 
  };

  const handleSave = async () => {
    if (!title || !calories) return Alert.alert('เตือน', 'กรุณากรอกชื่อและแคลอรี่');

    const newActivity: Activity = {
      id: Date.now().toString(),
      title,
      calories: parseFloat(calories),
      image: image || 'https://placehold.co/600x400?text=Sports',
      date: date.toISOString(),
      type: title,
    };

    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const data = existing ? JSON.parse(existing) : [];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newActivity, ...data]));
      
      Alert.alert('สำเร็จ', 'บันทึกเรียบร้อย', [{ text: 'ตกลง', onPress: () => router.push('/(tabs)') }]);
      setTitle(''); setCalories(''); setImage('');
    } catch (e) {
      Alert.alert('Error', 'บันทึกข้อมูลล้มเหลว');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.mainTitle}>บันทึกกีฬา</Text>

        <Text style={styles.sectionLabel}>เลือกกีฬาที่เล่น</Text>
        {/* QuickSelector จะแสดงผลตามโค้ดในไฟล์ component ที่เราเขียนไว้ */}
        <QuickSelector options={quickOptions} onSelect={handleQuickSelect} />

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>ลิงก์รูปภาพ (URL)</Text>
          <TextInput 
            style={styles.input}
            placeholder="วางลิงก์รูปภาพจากอินเทอร์เน็ตที่นี่..."
            value={image}
            onChangeText={setImage}
          />

          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <View style={styles.noImage}><Text style={{color:'#999'}}>ไม่มีรูปภาพตัวอย่าง</Text></View>
          )}

          <Text style={styles.inputLabel}>ชื่อกิจกรรม/สถานที่</Text>
          <TextInput 
            style={styles.input}
            placeholder="เช่น เล่นบาสที่สวนหลวง"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.inputLabel}>แคลอรี่ที่เผาผลาญ (kcal)</Text>
          <TextInput 
            style={styles.input}
            placeholder="ระบุตัวเลข..."
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.datePickerBtn} onPress={() => setShowDatePicker(true)}>
             <FontAwesome6 name="calendar-day" size={16} color="#666" />
             <Text style={styles.datePickerText}>{date.toLocaleDateString('th-TH')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>บันทึกข้อมูล</Text>
        </TouchableOpacity>

        {showDatePicker && <DateTimePicker value={date} mode="date" onChange={(_, d) => { setShowDatePicker(false); if(d) setDate(d); }} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 25 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 20 },
  sectionLabel: { fontSize: 16, color: '#666', marginBottom: 15, fontWeight: '600' },
  formCard: { backgroundColor: '#F9F9F9', borderRadius: 20, padding: 20, gap: 12 },
  inputLabel: { fontSize: 14, color: '#333', fontWeight: 'bold', marginTop: 5 },
  input: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', fontSize: 16 },
  previewImage: { width: '100%', height: 180, borderRadius: 12, marginTop: 5 },
  noImage: { width: '100%', height: 100, borderRadius: 12, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#CCC' },
  datePickerBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 15, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#EEE' },
  datePickerText: { fontSize: 16, color: '#333' },
  saveBtn: { backgroundColor: '#FF6F00', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 30, shadowColor: '#FF6F00', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  saveBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});