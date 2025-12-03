import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import InfoRow from '../components/InfoRow';

export default function ProfileScreen({ navigation }) {
  const { theme } = useTheme();
  const { userData } = useUser();

  const handleLogout = () => {
    try {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error("Error al intentar cerrar sesión:", error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.avatarContainer}>
          {userData.image ? (
            <Image 
              source={{ uri: userData.image }} 
              style={styles.avatar} 
            />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.avatarText}>
                {userData.nombre.charAt(0)}{userData.apellido.charAt(0)}
              </Text>
            </View>
          )}
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>{userData.nombre} {userData.apellido}</Text>
        <Text style={styles.role}>Administrador</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Información Personal</Text>
        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <InfoRow label="Cédula" value={userData.cedula} icon="card-outline" />
          <InfoRow label="Correo" value={userData.email} icon="mail-outline" />
          <InfoRow label="Teléfono" value={userData.telefono} icon="call-outline" />
          <InfoRow label="Departamento" value={userData.departamento} icon="business-outline" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuración</Text>
        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('Notifications')}>
            <View style={[styles.iconBox, { backgroundColor: '#e8f0fe' }]}>
              <Ionicons name="notifications-outline" size={22} color="#1a73e8" />
            </View>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>Notificaciones</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          
          <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('Security')}>
            <View style={[styles.iconBox, { backgroundColor: '#e6f4ea' }]}>
              <Ionicons name="shield-checkmark-outline" size={22} color="#1e8e3e" />
            </View>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>Seguridad</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <TouchableOpacity style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: '#fce8e6' }]}>
              <Ionicons name="help-circle-outline" size={22} color="#d93025" />
            </View>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>Ayuda y Soporte</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={[styles.logoutButton, { borderColor: '#dc3545' }]} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#dc3545" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>Versión 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0d6efd',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#6c757d',
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginLeft: 68,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  logoutText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  versionText: {
    fontSize: 14,
  },
});
