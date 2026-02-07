import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { QuickOption } from '../constants/types';

interface Props {
  options: QuickOption[];
  onSelect: (option: QuickOption) => void;
}

export default function QuickSelector({ options, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.chipContainer}>
        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.chip, { borderColor: opt.color }]}
            onPress={() => onSelect(opt)}
          >
            <FontAwesome6 name={opt.icon} size={14} color={opt.color} />
            <Text style={[styles.chipText, { color: opt.color }]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 20, 
    borderWidth: 1, 
    backgroundColor: 'white',
    gap: 6
  },
  chipText: { fontWeight: '600', fontSize: 14 }
});