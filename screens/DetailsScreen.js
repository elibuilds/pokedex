import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  const { pokemonName } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetails();
  }, [pokemonName]);

  const fetchDetails = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) throw new Error('Failed to fetch details');
      const data = await response.json();

      setDetails({
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t) => t.type.name),
        image: data.sprites.front_default,
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E63946" />
      </View>
    );
  }

  if (error || !details) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load Pokemon details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.number}>#{String(details.id).padStart(3, '0')}</Text>
        <Image source={{ uri: details.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{details.name.toUpperCase()}</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Types:</Text>
          <Text style={styles.value}>{details.types.join(', ')}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>{details.height / 10} m</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>{details.weight / 10} kg</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  number: {
    fontSize: 14,
    color: '#888888',
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    color: '#666666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3557',
    textTransform: 'capitalize',
  },
  errorText: {
    color: '#D90429',
    fontSize: 16,
  },
});