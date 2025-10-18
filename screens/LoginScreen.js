import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseniaUsuario, setContraseniaUsuario] = useState('');

  const handleLogin = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginContainer}>
          <LoginHeader />
          <LoginForm
            nombreUsuario={nombreUsuario}
            setNombreUsuario={setNombreUsuario}
            contraseniaUsuario={contraseniaUsuario}
            setContraseniaUsuario={setContraseniaUsuario}
            onLogin={handleLogin}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width > 768 ? 20 : 0,
  },
  loginContainer: {
    width: '100%',
    maxWidth: 900,
    backgroundColor: '#fff',
    borderRadius: width > 768 ? 24 : 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 10,
    flexDirection: width > 768 ? 'row' : 'column',
    minHeight: width > 768 ? 'auto' : '100%',
  },
});
