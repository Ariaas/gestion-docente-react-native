import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginHeader() {
  return (
    <View style={styles.loginGraphic}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.titleGraphic}>Sistema de Gestión Docente</Text>
      <Text style={styles.subtitleGraphic}>
        Universidad Politécnica Territorial de Lara "Andrés Eloy Blanco"
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loginGraphic: {
    flex: width > 768 ? 0.45 : 1,
    backgroundColor: '#0d6efd',
    padding: width > 768 ? 48 : 32,
    paddingTop: width > 768 ? 48 : 60,
    paddingBottom: width > 768 ? 48 : 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width > 768 ? 120 : 100,
    height: width > 768 ? 120 : 100,
    marginBottom: 20,
    tintColor: '#fff',
    opacity: 1,
  },
  titleGraphic: {
    fontSize: width > 768 ? 24 : 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  subtitleGraphic: {
    fontSize: width > 768 ? 14 : 13,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});
