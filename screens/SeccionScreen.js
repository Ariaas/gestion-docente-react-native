import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import CustomAlert from "../components/CustomAlert";
import { Ionicons } from "@expo/vector-icons";
import { secciones, horarios } from "../data/mockData";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import InfoRow from "../components/InfoRow";
import AddItemModal from "../components/AddItemModal";
import { useTheme } from "../context/ThemeContext";

export default function SeccionScreen() {
  const [searchText, setSearchText] = useState("");
  const [showHorarioModal, setShowHorarioModal] = useState(false);
  const [selectedSeccion, setSelectedSeccion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState(secciones);
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
      item.codigo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tipo.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleVerHorario = (seccion) => {
    setSelectedSeccion(seccion);
    setShowHorarioModal(true);
  };

  const getHorariosSeccion = (seccionId) => {
    return horarios.filter((h) => h.seccionId === seccionId);
  };

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleSubmit = (data) => {
    const newItem = {
      id: items.length + 1,
      ...data
    };
    setItems([...items, newItem]);
    setModalVisible(false);
    showAlert("Éxito", "Sección registrada correctamente", [{ text: 'OK', onPress: hideAlert }]);
  };

  const renderItem = ({ item }) => (
    <Card onPress={() => handleVerHorario(item)}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="people" size={24} color="#0d6efd" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.codigo, { color: theme.colors.text }]}>{item.codigo}</Text>
          <Text style={styles.tipo}>{item.tipo}</Text>
        </View>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleVerHorario(item)}
        >
          <Ionicons name="calendar" size={20} color="#0d6efd" />
        </TouchableOpacity>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <InfoRow label="Estudiantes" value={item.cantidadEstudiantes} />
      <InfoRow label="Año" value={item.ano} />
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar sección..."
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
            <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>No se encontraron secciones</Text>
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
        title="Registrar Sección"
        fields={[
          { 
            name: 'codigo', 
            label: 'Código', 
            placeholder: 'Ej: IN3103 o IIN2301',
            regex: '^[A-Za-z]{2,3}-?[0-9]+$',
            errorMsg: 'El código debe tener 2-3 letras seguidas de números (Ej: IN3103 o IIN2301).',
            required: true
          },
          { 
            name: 'tipo', 
            label: 'Tipo', 
            placeholder: 'Ej: Regular',
            regex: '^[a-zA-Z ]+$',
            errorMsg: 'El tipo solo debe contener letras.',
            required: true
          },
          { 
            name: 'cantidadEstudiantes', 
            label: 'Cantidad Estudiantes', 
            placeholder: 'Ej: 30', 
            keyboardType: 'numeric',
            regex: '^[0-9]+$',
            errorMsg: 'La cantidad debe ser un número.',
            required: true
          },
          { 
            name: 'ano', 
            label: 'Año', 
            placeholder: 'Ej: 2024', 
            keyboardType: 'numeric',
            regex: '^[0-9]{4}$',
            errorMsg: 'El año debe tener 4 dígitos.',
            required: true
          },
        ]}
      />

      <Modal
        visible={showHorarioModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowHorarioModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Horario - {selectedSeccion?.codigo}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowHorarioModal(false)}
            >
              <Ionicons name="close-circle" size={30} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalBody}>
            {selectedSeccion &&
            getHorariosSeccion(selectedSeccion.id).length > 0 ? (
              getHorariosSeccion(selectedSeccion.id).map((horario) => (
                <View key={horario.id} style={[styles.horarioCard, { backgroundColor: theme.colors.card }]}>
                  <View style={styles.horarioTimeContainer}>
                    <Text style={styles.horarioDia}>{horario.dia}</Text>
                    <Text style={styles.horarioHora}>
                      {horario.horaInicio} - {horario.horaFin}
                    </Text>
                  </View>
                  <View style={styles.horarioContent}>
                    <Text style={[styles.materiaName, { color: theme.colors.text }]}>{horario.unidadCurricular}</Text>
                    <View style={styles.horarioMetaRow}>
                      <Ionicons name="person-outline" size={14} color={theme.colors.textSecondary} />
                      <Text style={[styles.horarioMetaText, { color: theme.colors.textSecondary }]}>{horario.docente}</Text>
                    </View>
                    <View style={styles.horarioMetaRow}>
                      <Ionicons name="location-outline" size={14} color={theme.colors.textSecondary} />
                      <Text style={[styles.horarioMetaText, { color: theme.colors.textSecondary }]}>{horario.espacio}</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={64} color={theme.colors.textSecondary} />
                <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>
                  No hay horarios registrados
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>

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
  codigo: {
    fontSize: 16,
    fontWeight: "700",
  },
  tipo: {
    fontSize: 14,
    color: "#6c757d",
  },
  actionButton: {
    padding: 8,
    backgroundColor: "#e7f1ff",
    borderRadius: 8,
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

  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalBody: {
    padding: 16,
  },
  horarioCard: {
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  horarioTimeContainer: {
    backgroundColor: "#0d6efd",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  horarioDia: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
  horarioHora: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    textAlign: "center",
  },
  horarioContent: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  materiaName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  horarioMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  horarioMetaText: {
    marginLeft: 6,
    fontSize: 13,
  },
});
