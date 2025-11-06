import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";

export default function LoginScreen({ navigation }) {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseniaUsuario, setContraseniaUsuario] = useState("");

  const handleLogin = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={styles.container}
    >
      <View style={styles.loginContainer}>
        <LoginHeader />

        <View style={styles.formCard}>
          <LoginForm
            nombreUsuario={nombreUsuario}
            setNombreUsuario={setNombreUsuario}
            contraseniaUsuario={contraseniaUsuario}
            setContraseniaUsuario={setContraseniaUsuario}
            onLogin={handleLogin}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    padding: 20,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignSelf: "stretch",
    maxWidth: 540,
    alignSelf: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
