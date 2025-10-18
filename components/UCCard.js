import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function UCCard({ uc, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => onPress(uc)}
    >
      <View style={styles.header}>
        <Text style={styles.codigo}>{uc.codigo}</Text>
        <View style={[
          styles.badge,
          uc.estado === 'Activa' ? styles.badgeActive : styles.badgeInactive
        ]}>
          <Text style={styles.badgeText}>{uc.estado}</Text>
        </View>
      </View>
      
      <Text style={styles.nombre}>{uc.nombre}</Text>
      
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Créditos</Text>
          <Text style={styles.infoValue}>{uc.creditos}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Horas/Sem</Text>
          <Text style={styles.infoValue}>{uc.horasSemanales}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Trayecto</Text>
          <Text style={styles.infoValue}>{uc.trayecto}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.tipo}>{uc.tipo}</Text>
        <Text style={styles.trimestre}>Trimestre {uc.trimestre}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codigo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0d6efd',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeActive: {
    backgroundColor: '#d4edda',
  },
  badgeInactive: {
    backgroundColor: '#f8d7da',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#155724',
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 12,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipo: {
    fontSize: 13,
    color: '#6c757d',
  },
  trimestre: {
    fontSize: 13,
    color: '#6c757d',
  },
});
