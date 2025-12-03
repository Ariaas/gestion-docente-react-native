import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { StatusBar } from 'expo-status-bar';
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
import { useTheme } from "../context/ThemeContext";

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseniaUsuario, setContraseniaUsuario] = useState("");
  const { theme } = useTheme();

  const handleLogin = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {  }
      <View style={styles.topSection}>
        <LoginHeader />
      </View>

      {  }
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.bottomSection, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.formContainer}>
          <LoginForm
            nombreUsuario={nombreUsuario}
            setNombreUsuario={setNombreUsuario}
            contraseniaUsuario={contraseniaUsuario}
            setContraseniaUsuario={setContraseniaUsuario}
            onLogin={handleLogin}
            navigation={navigation}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d6efd",
  },
  topSection: {
    flex: 0.45, 
    backgroundColor: "#0d6efd",
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 0.55, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden', 
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});
