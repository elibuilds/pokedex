import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LogoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logged Out Successfully</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
});