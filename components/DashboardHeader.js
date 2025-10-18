import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardHeader({ userName = 'Usuario' }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Panel de Control</Text>
      <Text style={styles.headerSubtitle}>
        Bienvenido de nuevo, <Text style={styles.boldText}>{userName}</Text>. Selecciona una opción para empezar.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  boldText: {
    fontWeight: '600',
    color: '#333',
  },
});
