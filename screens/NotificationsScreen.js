import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function NotificationsScreen() {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    updates: false,
    newsletter: true,
  });
  const { theme } = useTheme();

  const toggleSwitch = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Preferencias de Notificación</Text>
      
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Notificaciones por Correo</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>Recibir correos sobre actividad importante</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#0d6efd" }}
            thumbColor={settings.email ? "#fff" : "#f4f3f4"}
            onValueChange={() => toggleSwitch('email')}
            value={settings.email}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Notificaciones Push</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>Recibir alertas en tu dispositivo</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#0d6efd" }}
            thumbColor={settings.push ? "#fff" : "#f4f3f4"}
            onValueChange={() => toggleSwitch('push')}
            value={settings.push}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Actualizaciones del Sistema</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>Novedades sobre la plataforma</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#0d6efd" }}
            thumbColor={settings.updates ? "#fff" : "#f4f3f4"}
            onValueChange={() => toggleSwitch('updates')}
            value={settings.updates}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
});
