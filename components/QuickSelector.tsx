import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { QuickOption } from '../constants/types';

interface Props {
  options: QuickOption[];
  onSelect: (option: QuickOption) => void;
}

export default function QuickSelector({ options, onSelect }: Props) {
  return (
    <View style={styles.gridContainer}>
      {options.map((opt, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.gridButton, { backgroundColor: opt.color }]} // ใช้สีพื้นหลังแทนรูป
          onPress={() => onSelect(opt)}
          activeOpacity={0.7}
        >
          <FontAwesome6 name={opt.icon} size={24} color="white" />
          <Text style={styles.gridLabel}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  gridButton: { 
    width: '48%', 
    padding: 20, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 10, 
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  gridLabel: { 
    color: 'white', 
    fontWeight: 'bold', 
    marginTop: 8,
    fontSize: 16
  },
});