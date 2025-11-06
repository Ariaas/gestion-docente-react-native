import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import ActionButton from "../components/ActionButton";
import SearchBar from "../components/SearchBar";
import { unidadesCurriculares } from "../data/mockData";

export default function UnidadCurricularScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredData = unidadesCurriculares.filter((uc) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (uc.codigo || "").toString().toLowerCase().includes(q) ||
      (uc.nombre || "").toString().toLowerCase().includes(q) ||
      (uc.area || "").toString().toLowerCase().includes(q)
    );
  });

  const handleEdit = (uc) => {
    Alert.alert("Modificar", `Editar: ${uc.nombre}`);
  };

  const handleDelete = (uc) => {
    Alert.alert("Eliminar", `¿Está seguro de eliminar ${uc.nombre}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive" },
    ]);
  };

  const handleViewDetails = (uc) => {
    Alert.alert(
      "Detalles de Unidad Curricular",
      `Código: ${uc.codigo}\nNombre: ${uc.nombre}\nTrayecto: ${uc.trayecto}\nÁrea: ${uc.area}\nFase: ${uc.fase}\nCréditos: ${uc.creditos}`,
      [{ text: "Cerrar" }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Gestionar Unidades Curriculares</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            Alert.alert("Registrar", "Abrir formulario de registro")
          }
        >
          <Text style={styles.addButtonText}>Registrar Unidad Curricular</Text>
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
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder=""
          />
        </View>
      </View>

      {/* Tabla */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.colCodigo]}>
                Código
              </Text>
              <Text style={[styles.tableHeaderText, styles.colNombre]}>
                Nombre
              </Text>
              <Text style={[styles.tableHeaderText, styles.colTrayecto]}>
                Trayecto
              </Text>
              <Text style={[styles.tableHeaderText, styles.colArea]}>Área</Text>
              <Text style={[styles.tableHeaderText, styles.colFase]}>Fase</Text>
              <Text style={[styles.tableHeaderText, styles.colEstado]}>
                Estado
              </Text>
              <Text style={[styles.tableHeaderText, styles.colAcciones]}>
                Acciones
              </Text>
            </View>

            {filteredData
              .slice(
                (page - 1) * itemsPerPage,
                (page - 1) * itemsPerPage + itemsPerPage
              )
              .map((uc, index) => (
                <View
                  key={uc.id}
                  style={[
                    styles.tableRow,
                    index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                  ]}
                >
                  <Text style={[styles.tableCell, styles.colCodigo]}>
                    {uc.codigo}
                  </Text>
                  <Text
                    style={[styles.tableCell, styles.colNombre]}
                    numberOfLines={2}
                  >
                    {uc.nombre}
                  </Text>
                  <Text style={[styles.tableCell, styles.colTrayecto]}>
                    {uc.trayecto === 0 ? "Inicial" : uc.trayecto}
                  </Text>
                  <Text
                    style={[styles.tableCell, styles.colArea]}
                    numberOfLines={1}
                  >
                    {uc.area}
                  </Text>
                  <Text style={[styles.tableCell, styles.colFase]}>
                    {uc.fase}
                  </Text>
                  <View style={[styles.tableCell, styles.colEstado]}>
                    <View
                      style={[
                        styles.badge,
                        uc.estado === "Activa"
                          ? styles.badgeActive
                          : styles.badgeInactive,
                      ]}
                    >
                      <Text style={styles.badgeText}>{uc.estado}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.tableCell,
                      styles.colAcciones,
                      styles.actionsCell,
                    ]}
                  >
                    <ActionButton
                      icon="eye"
                      color="#17a2b8"
                      onPress={() => handleViewDetails(uc)}
                    />
                    <ActionButton
                      icon="create"
                      color="#ffc107"
                      onPress={() => handleEdit(uc)}
                    />
                    <ActionButton
                      icon="trash"
                      color="#dc3545"
                      onPress={() => handleDelete(uc)}
                    />
                  </View>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.pagination}>
        <Text style={styles.paginationText}>
          Mostrando{" "}
          {Math.min((page - 1) * itemsPerPage + 1, filteredData.length)} -{" "}
          {Math.min(page * itemsPerPage, filteredData.length)} de{" "}
          {filteredData.length}
        </Text>
        <View style={styles.paginationButtons}>
          <TouchableOpacity
            style={styles.pageButton}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <Text style={styles.pageButtonText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pageButton, styles.activePageButton]}
          >
            <Text style={[styles.pageButtonText, styles.activePageButtonText]}>
              {page}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pageButton}
            onPress={() =>
              setPage((p) =>
                Math.min(p + 1, Math.ceil(filteredData.length / itemsPerPage))
              )
            }
            disabled={page >= Math.ceil(filteredData.length / itemsPerPage)}
          >
            <Text style={styles.pageButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    fontWeight: "700",
    color: "#0d6efd",
  },
  buttonContainer: {
    marginBottom: 20,
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
  table: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e7f1ff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  tableHeaderText: {
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
    alignItems: "center",
  },
  tableRowEven: {
    backgroundColor: "#f8f9fa",
  },
  tableRowOdd: {
    backgroundColor: "white",
  },
  tableCell: {
    fontSize: 14,
    color: "#212529",
    paddingHorizontal: 12,
    textAlign: "center",
  },
  colCodigo: {
    width: "12%",
  },
  colNombre: {
    width: "22%",
    textAlign: "left",
    paddingHorizontal: 4,
  },
  colTrayecto: {
    width: "10%",
  },
  colArea: {
    width: "15%",
  },
  colFase: {
    width: "10%",
  },
  colEstado: {
    width: "12%",
  },
  colAcciones: {
    width: "19%",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "center",
  },
  badgeActive: {
    backgroundColor: "#d4edda",
  },
  badgeInactive: {
    backgroundColor: "#f8d7da",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#155724",
  },
  actionsCell: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  actionBtn: {
    width: 28,
    height: 28,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  btnInfo: {
    backgroundColor: "#17a2b8",
  },
  btnEdit: {
    backgroundColor: "#ffc107",
  },
  btnDelete: {
    backgroundColor: "#dc3545",
  },
  actionBtnText: {
    fontSize: 14,
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
});
