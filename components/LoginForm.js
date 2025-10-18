import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginForm({ 
  nombreUsuario, 
  setNombreUsuario, 
  contraseniaUsuario, 
  setContraseniaUsuario, 
  onLogin 
}) {
  return (
    <View style={styles.loginFormWrapper}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>
        Bienvenido de nuevo, por favor ingrese sus credenciales.
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su usuario"
          value={nombreUsuario}
          onChangeText={setNombreUsuario}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          value={contraseniaUsuario}
          onChangeText={setContraseniaUsuario}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Acceder</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPasswordLink}>
        <Text style={styles.forgotPasswordText}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginFormWrapper: {
    flex: width > 768 ? 0.55 : 1,
    padding: width > 768 ? 48 : 24,
    paddingTop: width > 768 ? 48 : 32,
    justifyContent: 'center',
  },
  title: {
    fontSize: width > 768 ? 28 : 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: width > 768 ? 14 : 13,
    color: '#6c757d',
    marginBottom: 28,
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0d6efd',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordLink: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 8,
  },
  forgotPasswordText: {
    color: '#0d6efd',
    fontSize: 14,
  },
});
