import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function AddItemModal({ visible, onClose, onSubmit, title, fields }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { theme } = useTheme();

  useEffect(() => {
    if (visible) {
      setFormData({});
      setErrors({});
    }
  }, [visible]);

  const validateField = (name, value) => {
    const field = fields.find(f => f.name === name);
    if (!field) return null;

    if (field.required && !value) {
      return `El campo ${field.label} es obligatorio.`;
    }

    if (field.regex && value) {
      try {
        const regex = new RegExp(field.regex);
        if (!regex.test(value)) {
          return field.errorMsg || `El campo ${field.label} no es válido.`;
        }
      } catch (e) {
        console.error("Regex error:", e);
        return "Error de validación interna.";
      }
    }
    return null;
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
    
    let isValid = true;
    const newErrors = {};

    for (const field of fields) {
      const value = formData[field.name];
      const error = validateField(field.name, value);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View style={[styles.modalView, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            {fields.map((field) => (
              <View key={field.name} style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>{field.label}</Text>
                {field.type === 'select' ? (
                  <View style={[
                    styles.selectContainer, 
                    { 
                      backgroundColor: theme.colors.background, 
                      borderColor: errors[field.name] ? '#dc3545' : theme.colors.border,
                    }
                  ]}>
                    <Picker
                      selectedValue={formData[field.name] || ''}
                      onValueChange={(value) => handleChange(field.name, value)}
                      style={[styles.picker, { color: theme.colors.text }]}
                      dropdownIconColor={theme.colors.text}
                    >
                      <Picker.Item 
                        label={field.placeholder || 'Seleccione una opción'} 
                        value="" 
                        color={theme.colors.textSecondary}
                      />
                      {field.options && field.options.map((option, index) => (
                        <Picker.Item 
                          key={index} 
                          label={option} 
                          value={option}
                        />
                      ))}
                    </Picker>
                  </View>
                ) : (
                  <TextInput
                    style={[
                      styles.input, 
                      { 
                        backgroundColor: theme.colors.background, 
                        borderColor: errors[field.name] ? '#dc3545' : theme.colors.border,
                        color: theme.colors.text 
                      }
                    ]}
                    placeholder={field.placeholder}
                    placeholderTextColor={theme.colors.textSecondary}
                    value={formData[field.name] || ''}
                    onChangeText={(text) => handleChange(field.name, text)}
                    keyboardType={field.keyboardType || 'default'}
                    multiline={field.multiline}
                    numberOfLines={field.numberOfLines || 1}
                  />
                )}
                {errors[field.name] && (
                  <Text style={styles.errorText}>{errors[field.name]}</Text>
                )}
              </View>
            ))}
          </ScrollView>

          <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]} 
              onPress={onClose}
            >
              <Text style={[styles.cancelButtonText, { color: theme.colors.text }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  formContainer: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  selectContainer: {
    borderWidth: 1,
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 1,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#0d6efd',
  },
  cancelButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
