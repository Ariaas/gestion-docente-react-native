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
import { mallasCurriculares } from "../data/mockData";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import InfoRow from "../components/InfoRow";
import AddItemModal from "../components/AddItemModal";
import { useTheme } from "../context/ThemeContext";

export default function MallaCurricularScreen() {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState(mallasCurriculares);
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
    Alert.alert("Éxito", "Malla curricular registrada correctamente");
  };

  const renderItem = ({ item }) => (
    <Card onPress={() => Alert.alert("Detalles", item.nombre)}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="git-network" size={24} color="#e74a3b" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.nombre, { color: theme.colors.text }]}>{item.nombre}</Text>
          <Text style={styles.codigo}>{item.codigo}</Text>
        </View>
        <View style={[styles.badge, item.estado === 'Activa' ? styles.activeBadge : styles.inactiveBadge]}>
           <Text style={[styles.badgeText, item.estado === 'Activa' ? styles.activeBadgeText : styles.inactiveBadgeText]}>
             {item.estado}
           </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <InfoRow label="PNF" value={item.pnf} />
      <InfoRow label="Trayectos" value={item.trayecto} />
      <InfoRow label="Duración" value={item.duracion} />
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar malla..."
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
            <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>No se encontraron mallas</Text>
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
        title="Registrar Malla"
        fields={[
          { 
            name: 'nombre', 
            label: 'Nombre', 
            placeholder: 'Ej: Malla 2024',
            regex: '^[a-zA-Z0-9 ]+$',
            errorMsg: 'El nombre contiene caracteres inválidos.',
            required: true
          },
          { 
            name: 'codigo', 
            label: 'Código', 
            placeholder: 'Ej: MALLA-24',
            regex: '^[A-Z]{5}-[0-9]{2}$',
            errorMsg: 'El código debe tener el formato AAAAA-00 (Ej: MALLA-24).',
            required: true
          },
          { 
            name: 'pnf', 
            label: 'PNF', 
            placeholder: 'Ej: Informática',
            regex: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$',
            errorMsg: 'El PNF solo debe contener letras.',
            required: true
          },
          { 
            name: 'trayecto', 
            label: 'Trayectos', 
            placeholder: 'Ej: 4', 
            keyboardType: 'numeric',
            regex: '^[0-9]+$',
            errorMsg: 'Trayectos debe ser un número.',
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
    backgroundColor: "#fadbd8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  pnf: {
    fontSize: 16,
    fontWeight: "700",
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
  },
  activeBadge: {
    backgroundColor: "#d1e7dd",
  },
  inactiveBadge: {
    backgroundColor: "#f8d7da",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  activeBadgeText: {
    color: "#0f5132",
  },
  inactiveBadgeText: {
    color: "#842029",
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
