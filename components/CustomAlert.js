import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const CustomAlert = ({ visible, title, message, buttons }) => {
  const { theme } = useTheme();

  const getIconInfo = (type) => {
    switch (type.toLowerCase()) {
      case 'éxito':
        return { name: 'checkmark-circle-outline', color: '#198754' };
      case 'error':
        return { name: 'close-circle-outline', color: '#dc3545' };
      case 'advertencia':
        return { name: 'alert-circle-outline', color: '#ffc107' };
      default:
        return { name: 'information-circle-outline', color: theme.colors.primary };
    }
  };

  const icon = getIconInfo(title);

  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        const closeButton = buttons.find(b => b.style === 'cancel') || (buttons.length > 0 ? buttons[0] : null);
        closeButton?.onPress();
      }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.header}>
            <Ionicons name={icon.name} size={28} color={icon.color} style={styles.icon} />
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>{title}</Text>
          </View>
          <Text style={[styles.modalText, { color: theme.colors.textSecondary }]}>{message}</Text>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  { flex: 1, marginLeft: index > 0 ? 8 : 0 },
                  button.style === 'destructive' 
                    ? { backgroundColor: '#dc3545' } 
                    : button.style === 'cancel' 
                    ? { backgroundColor: theme.colors.background, borderWidth: 1, borderColor: theme.colors.border }
                    : { backgroundColor: theme.colors.primary }
                ]}
                onPress={button.onPress}
              >
                <Text style={[
                  styles.textStyle,
                  button.style === 'destructive' || button.style === 'primary' 
                    ? { color: '#fff' } 
                    : { color: theme.colors.text }
                ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  modalText: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CustomAlert;
