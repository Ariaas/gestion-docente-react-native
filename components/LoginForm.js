import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function LoginForm({
  nombreUsuario,
  setNombreUsuario,
  contraseniaUsuario,
  setContraseniaUsuario,
  onLogin,
  navigation,
}) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!nombreUsuario.trim()) {
      newErrors.nombreUsuario = "El usuario es requerido";
      valid = false;
    } else if (nombreUsuario.length < 4) {
      newErrors.nombreUsuario = "El usuario debe tener al menos 4 caracteres";
      valid = false;
    } else if (!USERNAME_REGEX.test(nombreUsuario)) {
      newErrors.nombreUsuario = "El usuario solo puede contener letras, números y guiones bajos";
      valid = false;
    }

    if (!contraseniaUsuario.trim()) {
      newErrors.contraseniaUsuario = "La contraseña es requerida";
      valid = false;
    } else if (contraseniaUsuario.length < 6) {
      newErrors.contraseniaUsuario = "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    } else if (!PASSWORD_REGEX.test(contraseniaUsuario)) {
      newErrors.contraseniaUsuario = "La contraseña debe tener al menos 8 caracteres, una letra y un número";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Iniciar Sesión</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Ingrese sus credenciales para continuar
      </Text>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Usuario</Text>
        <TextInput
          style={[
            styles.input, 
            errors.nombreUsuario && styles.inputError,
            { 
              backgroundColor: theme.colors.card, 
              borderColor: theme.colors.border,
              color: theme.colors.text 
            }
          ]}
          placeholder="Ingrese su usuario"
          placeholderTextColor={theme.colors.textSecondary}
          value={nombreUsuario}
          onChangeText={(text) => {
            setNombreUsuario(text);
            if (errors.nombreUsuario) setErrors({ ...errors, nombreUsuario: null });
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.nombreUsuario && (
          <Text style={styles.errorText}>{errors.nombreUsuario}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Contraseña</Text>
        <TextInput
          style={[
            styles.input, 
            errors.contraseniaUsuario && styles.inputError,
            { 
              backgroundColor: theme.colors.card, 
              borderColor: theme.colors.border,
              color: theme.colors.text 
            }
          ]}
          placeholder="Ingrese su contraseña"
          placeholderTextColor={theme.colors.textSecondary}
          value={contraseniaUsuario}
          onChangeText={(text) => {
            setContraseniaUsuario(text);
            if (errors.contraseniaUsuario) setErrors({ ...errors, contraseniaUsuario: null });
          }}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.contraseniaUsuario && (
          <Text style={styles.errorText}>{errors.contraseniaUsuario}</Text>
        )}
      </View>

      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Acceder</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.forgotPasswordLink}
        onPress={() => navigation.navigate('RecoverPassword')}
      >
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#dc3545",
    borderWidth: 1.5,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  button: {
    backgroundColor: "#0d6efd",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#0d6efd",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPasswordLink: {
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 8,
  },
  forgotPasswordText: {
    color: "#0d6efd",
    fontSize: 14,
    fontWeight: "500",
  },
});
