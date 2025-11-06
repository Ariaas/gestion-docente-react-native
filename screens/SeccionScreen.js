import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { secciones, horarios } from "../data/mockData";
import ActionButton from "../components/ActionButton";
import SearchBar from "../components/SearchBar";

export default function SeccionScreen() {
  const [searchText, setSearchText] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showHorarioModal, setShowHorarioModal] = useState(false);
  const [selectedSeccion, setSelectedSeccion] = useState(null);

  const filteredData = secciones.filter(
    (item) =>
      item.codigo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tipo.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleVerHorario = (seccion) => {
    setSelectedSeccion(seccion);
    setShowHorarioModal(true);
  };

  const handleEdit = (item) => {
    Alert.alert("Modificar", `Editar: ${item.codigo}`);
  };

  const handleDelete = (item) => {
    Alert.alert("Eliminar", `¿Está seguro de eliminar ${item.codigo}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive" },
    ]);
  };

  const getHorariosSeccion = (seccionId) => {
    return horarios.filter((h) => h.seccionId === seccionId);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Gestionar Sección</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.horarioButton}>
          <Text style={styles.horarioButtonText}>Unir Horarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Registrar Sección</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <View style={styles.leftControls}>
          <Text style={styles.label}>Mostrar</Text>
          <View style={styles.selectContainer}>
            <TextInput
              style={styles.select}
              value={itemsPerPage.toString()}
              editable={false}
            />
          </View>
          <Text style={styles.label}>registros</Text>
        </View>
        <View style={styles.searchContainer}>
          <Text style={styles.label}>Buscar:</Text>
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder=""
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.codigoColumn]}>
              CÓDIGO DE SECCIÓN
            </Text>
            <Text style={[styles.headerCell, styles.estudiantesColumn]}>
              CANTIDAD DE ESTUDIANTES
            </Text>
            <Text style={[styles.headerCell, styles.anoColumn]}>AÑO</Text>
            <Text style={[styles.headerCell, styles.tipoColumn]}>TIPO</Text>
            <Text style={[styles.headerCell, styles.accionesColumn]}>
              ACCIONES
            </Text>
          </View>

          {filteredData.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
            >
              <Text style={[styles.cell, styles.codigoColumn]}>
                {item.codigo}
              </Text>
              <Text style={[styles.cell, styles.estudiantesColumn]}>
                {item.cantidadEstudiantes}
              </Text>
              <Text style={[styles.cell, styles.anoColumn]}>{item.ano}</Text>
              <Text style={[styles.cell, styles.tipoColumn]}>{item.tipo}</Text>
              <View
                style={[styles.cell, styles.accionesColumn, styles.actionsCell]}
              >
                <ActionButton
                  icon="eye"
                  color="#0d6efd"
                  onPress={() => handleVerHorario(item)}
                />
                <ActionButton
                  icon="calendar"
                  color="#6c757d"
                  onPress={() => Alert.alert("Calendario", "Función simulada")}
                />
                <ActionButton
                  icon="create"
                  color="#ffc107"
                  onPress={() => handleEdit(item)}
                />
                <ActionButton
                  icon="trash"
                  color="#dc3545"
                  onPress={() => handleDelete(item)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.pagination}>
        <Text style={styles.paginationText}>Mostrando 1 de 1</Text>
        <View style={styles.paginationButtons}>
          <TouchableOpacity style={styles.pageButton}>
            <Text style={styles.pageButtonText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pageButton, styles.activePageButton]}
          >
            <Text style={[styles.pageButtonText, styles.activePageButtonText]}>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageButton}>
            <Text style={styles.pageButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showHorarioModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowHorarioModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Horario de Sección {selectedSeccion?.codigo}
              </Text>
              <TouchableOpacity onPress={() => setShowHorarioModal(false)}>
                <Ionicons name="close" size={28} color="#495057" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {selectedSeccion &&
              getHorariosSeccion(selectedSeccion.id).length > 0 ? (
                getHorariosSeccion(selectedSeccion.id).map((horario) => (
                  <View key={horario.id} style={styles.horarioCard}>
                    <View style={styles.horarioHeader}>
                      <Text style={styles.horarioDia}>{horario.dia}</Text>
                      <Text style={styles.horarioHora}>
                        {horario.horaInicio} - {horario.horaFin}
                      </Text>
                    </View>
                    <View style={styles.horarioDetails}>
                      <View style={styles.horarioRow}>
                        <Ionicons name="book" size={16} color="#0d6efd" />
                        <Text style={styles.horarioText}>
                          {horario.unidadCurricular}
                        </Text>
                      </View>
                      <View style={styles.horarioRow}>
                        <Ionicons name="person" size={16} color="#28a745" />
                        <Text style={styles.horarioText}>
                          {horario.docente}
                        </Text>
                      </View>
                      <View style={styles.horarioRow}>
                        <Ionicons name="location" size={16} color="#ffc107" />
                        <Text style={styles.horarioText}>
                          {horario.espacio}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="calendar-outline" size={64} color="#dee2e6" />
                  <Text style={styles.emptyStateText}>
                    No hay horarios registrados
                  </Text>
                </View>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowHorarioModal(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0d6efd",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  horarioButton: {
    backgroundColor: "#0d6efd",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  horarioButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
  },
  leftControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#495057",
    marginRight: 8,
  },
  selectContainer: {
    marginRight: 8,
  },
  select: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 60,
    fontSize: 14,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 250,
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    minWidth: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e7f1ff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  headerCell: {
    fontSize: 12,
    fontWeight: "600",
    color: "#495057",
    paddingHorizontal: 12,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  evenRow: {
    backgroundColor: "#f8f9fa",
  },
  oddRow: {
    backgroundColor: "white",
  },
  cell: {
    fontSize: 14,
    color: "#212529",
    paddingHorizontal: 12,
    textAlign: "center",
  },
  codigoColumn: {
    width: 200,
  },
  estudiantesColumn: {
    width: 200,
  },
  anoColumn: {
    width: 120,
  },
  tipoColumn: {
    width: 120,
  },
  accionesColumn: {
    width: 200,
  },
  actionsCell: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
  },
  paginationText: {
    fontSize: 14,
    color: "#495057",
  },
  paginationButtons: {
    flexDirection: "row",
    gap: 5,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#dee2e6",
    backgroundColor: "white",
    marginHorizontal: 2,
  },
  activePageButton: {
    backgroundColor: "#0d6efd",
    borderColor: "#0d6efd",
  },
  pageButtonText: {
    fontSize: 14,
    color: "#495057",
  },
  activePageButtonText: {
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "90%",
    maxHeight: "80%",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    backgroundColor: "#f8f9fa",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
  },
  modalBody: {
    padding: 20,
  },
  horarioCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#0d6efd",
  },
  horarioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  horarioDia: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },
  horarioHora: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "600",
  },
  horarioDetails: {
    gap: 8,
  },
  horarioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  horarioText: {
    fontSize: 14,
    color: "#495057",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 12,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
    backgroundColor: "#f8f9fa",
  },
  closeButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
