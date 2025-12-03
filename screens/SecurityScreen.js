import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import CustomAlert from '../components/CustomAlert';
import { useTheme } from '../context/ThemeContext';

export default function SecurityScreen({ navigation }) {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const { theme } = useTheme();
  const [alertInfo, setAlertInfo] = useState({ visible: false, title: '', message: '', buttons: [] });

  const showAlert = (title, message, buttons) => {
    setAlertInfo({ visible: true, title, message, buttons });
  };

  const hideAlert = () => {
    setAlertInfo({ visible: false, title: '', message: '', buttons: [] });
  };

  const handleSave = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      showAlert('Error', 'Por favor complete todos los campos', [{ text: 'OK', onPress: hideAlert }]);
      return;
    }
    if (passwords.new !== passwords.confirm) {
      showAlert('Error', 'Las contraseñas nuevas no coinciden', [{ text: 'OK', onPress: hideAlert }]);
      return;
    }
    showAlert('Éxito', 'Contraseña actualizada correctamente', [
      { text: 'Genial', onPress: () => { hideAlert(); navigation.goBack(); } }
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Contraseña Actual</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.card, 
            borderColor: theme.colors.border,
            color: theme.colors.text 
          }]}
          secureTextEntry
          value={passwords.current}
          onChangeText={(text) => setPasswords({...passwords, current: text})}
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Nueva Contraseña</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.card, 
            borderColor: theme.colors.border,
            color: theme.colors.text 
          }]}
          secureTextEntry
          value={passwords.new}
          onChangeText={(text) => setPasswords({...passwords, new: text})}
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Confirmar Nueva Contraseña</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.card, 
            borderColor: theme.colors.border,
            color: theme.colors.text 
          }]}
          secureTextEntry
          value={passwords.confirm}
          onChangeText={(text) => setPasswords({...passwords, confirm: text})}
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Actualizar Contraseña</Text>
      </TouchableOpacity>

      <CustomAlert 
        visible={alertInfo.visible}
        title={alertInfo.title}
        message={alertInfo.message}
        buttons={alertInfo.buttons}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#198754',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#198754",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
