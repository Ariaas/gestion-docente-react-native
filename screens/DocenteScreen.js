import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomAlert from "../components/CustomAlert";
import { Ionicons } from "@expo/vector-icons";
import { docentes } from "../data/mockData";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import InfoRow from "../components/InfoRow";
import AddItemModal from "../components/AddItemModal";
import { useTheme } from "../context/ThemeContext";

export default function DocenteScreen() {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState(docentes);
  const { theme } = useTheme();
  const [alertInfo, setAlertInfo] = useState({ visible: false, title: '', message: '', buttons: [] });

  const showAlert = (title, message, buttons) => {
    setAlertInfo({ visible: true, title, message, buttons });
  };

  const hideAlert = () => {
    setAlertInfo({ visible: false, title: '', message: '', buttons: [] });
  };

  const filteredData = items.filter(
    (item) =>
      item.nombreCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
      item.cedula.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleSubmit = (data) => {
    const newItem = {
      id: items.length + 1,
      nombreCompleto: data.nombre,
      ...data,
      estado: 'Activo'
    };
    setItems([...items, newItem]);
    setModalVisible(false);
    showAlert("Éxito", "Docente registrado correctamente", [{ text: 'OK', onPress: hideAlert }]);
  };

  const renderItem = ({ item }) => (
    <Card onPress={() => showAlert("Detalles", `Cédula: ${item.cedula}`, [{ text: 'Cerrar', onPress: hideAlert }])}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="person" size={24} color="#4e73df" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.nombre, { color: theme.colors.text }]}>{item.nombreCompleto}</Text>
          <Text style={styles.cedula}>{item.cedula}</Text>
        </View>
        <View style={[styles.badge, item.estado === 'Activo' ? styles.activeBadge : styles.inactiveBadge]}>
           <Text style={[styles.badgeText, item.estado === 'Activo' ? styles.activeBadgeText : styles.inactiveBadgeText]}>
             {item.estado}
           </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <InfoRow label="Email" value={item.email} />
      <InfoRow label="Teléfono" value={item.telefono} />
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar docente..."
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
            <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>No se encontraron docentes</Text>
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
        title="Registrar Docente"
        fields={[
          { 
            name: 'nombre', 
            label: 'Nombre Completo', 
            placeholder: 'Ej: Juan Pérez',
            regex: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$',
            errorMsg: 'El nombre solo debe contener letras.',
            required: true
          },
          { 
            name: 'cedula', 
            label: 'Cédula', 
            placeholder: 'Ej: V-12345678', 
            keyboardType: 'numeric',
            regex: '^[vVeE]-[0-9]{6,9}$',
            errorMsg: 'La cédula debe tener el formato V-12345678 o E-12345678.',
            required: true
          },
          { 
            name: 'email', 
            label: 'Correo Electrónico', 
            placeholder: 'Ej: juan@uptaeb.edu.ve', 
            keyboardType: 'email-address',
            regex: '^[^\\s@]+@[^\\s@]+\.[^\\s@]+$',
            errorMsg: 'Ingrese un correo electrónico válido.',
            required: true
          },
          { 
            name: 'telefono', 
            label: 'Teléfono', 
            placeholder: 'Ej: 0412-1234567', 
            keyboardType: 'phone-pad',
            regex: '^[0-9]{4}-[0-9]{7}$',
            errorMsg: 'El teléfono debe tener el formato 0412-1234567.',
            required: true
          },
        ]}
      />

      <CustomAlert 
        visible={alertInfo.visible}
        title={alertInfo.title}
        message={alertInfo.message}
        buttons={alertInfo.buttons}
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
    backgroundColor: "#e7f1ff",
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
  cedula: {
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
