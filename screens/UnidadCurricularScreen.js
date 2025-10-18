import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { unidadesCurriculares } from '../data/mockData';

export default function UnidadCurricularScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (uc) => {
    Alert.alert('Modificar', `Editar: ${uc.nombre}`);
  };

  const handleDelete = (uc) => {
    Alert.alert(
      'Eliminar',
      `¿Está seguro de eliminar ${uc.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive' }
      ]
    );
  };

  const handleViewDetails = (uc) => {
    Alert.alert(
      'Detalles de Unidad Curricular',
      `Código: ${uc.codigo}\nNombre: ${uc.nombre}\nTrayecto: ${uc.trayecto}\nÁrea: ${uc.area}\nFase: ${uc.fase}\nCréditos: ${uc.creditos}`,
      [{ text: 'Cerrar' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Gestionar Unidades Curriculares</Text>
        <TouchableOpacity 
          style={styles.btnRegistrar}
          onPress={() => Alert.alert('Registrar', 'Abrir formulario de registro')}
        >
          <Text style={styles.btnRegistrarText}>Registrar Unidad Curricular</Text>
        </TouchableOpacity>
      </View>

      {/* Tabla */}
      <ScrollView style={styles.tableContainer}>
        <View style={styles.table}>
          {/* Header de la tabla */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colCodigo]}>Código</Text>
            <Text style={[styles.tableHeaderText, styles.colNombre]}>Nombre</Text>
            <Text style={[styles.tableHeaderText, styles.colTrayecto]}>Trayecto</Text>
            <Text style={[styles.tableHeaderText, styles.colArea]}>Área</Text>
            <Text style={[styles.tableHeaderText, styles.colFase]}>Fase</Text>
            <Text style={[styles.tableHeaderText, styles.colEstado]}>Estado</Text>
            <Text style={[styles.tableHeaderText, styles.colAcciones]}>Acciones</Text>
          </View>

          {/* Filas de la tabla */}
          {unidadesCurriculares.map((uc, index) => (
            <View 
              key={uc.id} 
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
              ]}
            >
              <Text style={[styles.tableCell, styles.colCodigo]}>{uc.codigo}</Text>
              <Text style={[styles.tableCell, styles.colNombre]} numberOfLines={2}>
                {uc.nombre}
              </Text>
              <Text style={[styles.tableCell, styles.colTrayecto]}>
                {uc.trayecto === 0 ? 'Inicial' : uc.trayecto}
              </Text>
              <Text style={[styles.tableCell, styles.colArea]} numberOfLines={1}>
                {uc.area}
              </Text>
              <Text style={[styles.tableCell, styles.colFase]}>{uc.fase}</Text>
              <View style={[styles.tableCell, styles.colEstado]}>
                <View style={[
                  styles.badge,
                  uc.estado === 'Activa' ? styles.badgeActive : styles.badgeInactive
                ]}>
                  <Text style={styles.badgeText}>{uc.estado}</Text>
                </View>
              </View>
              <View style={[styles.tableCell, styles.colAcciones]}>
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.btnInfo]}
                    onPress={() => handleViewDetails(uc)}
                  >
                    <Text style={styles.actionBtnText}>👁️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.btnEdit]}
                    onPress={() => handleEdit(uc)}
                  >
                    <Text style={styles.actionBtnText}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.btnDelete]}
                    onPress={() => handleDelete(uc)}
                  >
                    <Text style={styles.actionBtnText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0d6efd',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 1,
  },
  btnRegistrar: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  btnRegistrarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  tableContainer: {
    flex: 1,
    padding: 16,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0d6efd',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'center',
  },
  tableRowEven: {
    backgroundColor: '#fff',
  },
  tableRowOdd: {
    backgroundColor: '#f8f9fa',
  },
  tableCell: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  colCodigo: {
    width: '12%',
  },
  colNombre: {
    width: '22%',
    textAlign: 'left',
    paddingHorizontal: 4,
  },
  colTrayecto: {
    width: '10%',
  },
  colArea: {
    width: '15%',
  },
  colFase: {
    width: '10%',
  },
  colEstado: {
    width: '12%',
  },
  colAcciones: {
    width: '19%',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  badgeActive: {
    backgroundColor: '#d4edda',
  },
  badgeInactive: {
    backgroundColor: '#f8d7da',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#155724',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  actionBtn: {
    width: 28,
    height: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnInfo: {
    backgroundColor: '#17a2b8',
  },
  btnEdit: {
    backgroundColor: '#ffc107',
  },
  btnDelete: {
    backgroundColor: '#dc3545',
  },
  actionBtnText: {
    fontSize: 14,
  },
});
