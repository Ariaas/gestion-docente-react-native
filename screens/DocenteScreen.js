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
import { Ionicons } from "@expo/vector-icons";
import { docentesCompleto } from "../data/mockData";
import ActionButton from "../components/ActionButton";
import SearchBar from "../components/SearchBar";

export default function DocenteScreen() {
  const [searchText, setSearchText] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleEdit = (item) => {
    Alert.alert("Modificar", `Editar: ${item.nombre} ${item.apellido}`);
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Eliminar",
      `¿Está seguro de eliminar ${item.nombre} ${item.apellido}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive" },
      ]
    );
  };

  const filteredData = docentesCompleto.filter(
    (item) =>
      item.cedula.toLowerCase().includes(searchText.toLowerCase()) ||
      item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      item.apellido.toLowerCase().includes(searchText.toLowerCase()) ||
      item.correo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Gestionar Docente</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Registrar Docente</Text>
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
            <Text style={[styles.headerCell, styles.cedulaColumn]}>CÉDULA</Text>
            <Text style={[styles.headerCell, styles.apellidoColumn]}>
              APELLIDO
            </Text>
            <Text style={[styles.headerCell, styles.nombreColumn]}>NOMBRE</Text>
            <Text style={[styles.headerCell, styles.correoColumn]}>CORREO</Text>
            <Text style={[styles.headerCell, styles.categoriaColumn]}>
              CATEGORÍA
            </Text>
            <Text style={[styles.headerCell, styles.dedicacionColumn]}>
              DEDICACIÓN
            </Text>
            <Text style={[styles.headerCell, styles.condicionColumn]}>
              CONDICIÓN
            </Text>
            <Text style={[styles.headerCell, styles.estadoColumn]}>ESTADO</Text>
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
              <Text style={[styles.cell, styles.cedulaColumn]}>
                {item.cedula}
              </Text>
              <Text style={[styles.cell, styles.apellidoColumn]}>
                {item.apellido}
              </Text>
              <Text style={[styles.cell, styles.nombreColumn]}>
                {item.nombre}
              </Text>
              <Text style={[styles.cell, styles.correoColumn]}>
                {item.correo}
              </Text>
              <Text style={[styles.cell, styles.categoriaColumn]}>
                {item.categoria}
              </Text>
              <Text style={[styles.cell, styles.dedicacionColumn]}>
                {item.dedicacion}
              </Text>
              <Text style={[styles.cell, styles.condicionColumn]}>
                {item.condicion}
              </Text>
              <View style={[styles.cell, styles.estadoColumn]}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.estado}</Text>
                </View>
              </View>
              <View
                style={[styles.cell, styles.accionesColumn, styles.actionsCell]}
              >
                <ActionButton
                  icon="create"
                  color="#ffc107"
                  onPress={() => handleEdit(item)}
                />
                <ActionButton
                  icon="power"
                  color="#dc3545"
                  onPress={() => handleDelete(item)}
                />
                <ActionButton
                  icon="eye"
                  color="#0d6efd"
                  onPress={() =>
                    Alert.alert("Ver", `${item.nombre} ${item.apellido}`)
                  }
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
  cedulaColumn: {
    width: 120,
  },
  apellidoColumn: {
    width: 120,
  },
  nombreColumn: {
    width: 120,
  },
  correoColumn: {
    width: 200,
  },
  categoriaColumn: {
    width: 120,
  },
  dedicacionColumn: {
    width: 150,
  },
  condicionColumn: {
    width: 120,
  },
  estadoColumn: {
    width: 100,
  },
  accionesColumn: {
    width: 150,
  },
  badge: {
    backgroundColor: "#28a745",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
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
});
