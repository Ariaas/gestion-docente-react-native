import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { unidadesCurriculares } from "../data/mockData";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import InfoRow from "../components/InfoRow";
import AddItemModal from "../components/AddItemModal";
import { useTheme } from "../context/ThemeContext";

export default function UnidadCurricularScreen() {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState(unidadesCurriculares);
  const { theme } = useTheme();

  const filteredData = items.filter(
    (item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleSubmit = (data) => {
    const newItem = {
      id: items.length + 1,
      ...data,
      estado: 'Activa' 
    };
    setItems([...items, newItem]);
    setModalVisible(false);
    Alert.alert("Éxito", "Unidad curricular registrada correctamente");
  };

  const renderItem = ({ item }) => (
    <Card onPress={() => Alert.alert("Detalles", item.nombre)}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="book" size={24} color="#f6c23e" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.nombre, { color: theme.colors.text }]}>{item.nombre}</Text>
          <Text style={styles.codigo}>{item.codigo}</Text>
        </View>
        <View style={[styles.badge, item.estado === 'Activa' ? styles.activeBadge : styles.inactiveBadge]}>
          <Text style={[styles.badgeText, item.estado === 'Activa' ? styles.activeText : styles.inactiveText]}>{item.estado}</Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <InfoRow label="Trayecto" value={`Trayecto ${item.trayecto}`} />
      <InfoRow label="Período" value={item.fase} />
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar unidad..."
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>No se encontraron unidades</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <AddItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        title="Registrar Unidad"
        fields={[
          { 
            name: 'nombre', 
            label: 'Nombre', 
            placeholder: 'Ej: Matemática I',
            regex: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$',
            errorMsg: 'El nombre contiene caracteres inválidos.',
            required: true
          },
          { 
            name: 'codigo', 
            label: 'Código', 
            placeholder: 'Ej: MAT-101',
            regex: '^[A-Z]{3}-[0-9]{3}$',
            errorMsg: 'El código debe tener el formato AAA-000 (Ej: MAT-101).',
            required: true
          },
          { 
            name: 'trayecto', 
            label: 'Trayecto', 
            placeholder: 'Ej: 1',
            keyboardType: 'numeric',
            regex: '^[0-9]+$',
            errorMsg: 'El trayecto debe ser un número.',
            required: true
          },
          {
            name: 'fase',
            label: 'Período',
            placeholder: 'Ej: Fase I, Fase II, Anual',
            required: true
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff3cd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "700",
  },
  codigo: {
    fontSize: 14,
    color: "#6c757d",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  activeBadge: {
    backgroundColor: '#d4edda',
  },
  inactiveBadge: {
    backgroundColor: '#f8d7da',
  },
  activeText: {
    color: '#155724',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#721c24',
    fontWeight: '600',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#495057",
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0d6efd",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});
