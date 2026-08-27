import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PokemonCard({ name, image, number, isFavorite, onToggleFavorite, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.number}>#{String(number).padStart(3, '0')}</Text>
        <TouchableOpacity onPress={onToggleFavorite}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? '#E63946' : '#666666'}
          />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  number: {
    fontSize: 12,
    color: '#888888',
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 80,
    marginVertical: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});