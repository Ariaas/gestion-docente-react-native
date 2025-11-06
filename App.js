import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import UnidadCurricularScreen from './screens/UnidadCurricularScreen';
import MallaCurricularScreen from './screens/MallaCurricularScreen';
import EspaciosScreen from './screens/EspaciosScreen';
import DocenteScreen from './screens/DocenteScreen';
import SeccionScreen from './screens/SeccionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{
            headerShown: true,
            headerTitle: 'Sistema de Gestión Docente',
            headerStyle: {
              backgroundColor: '#0d6efd',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
        <Stack.Screen 
          name="UnidadCurricular" 
          component={UnidadCurricularScreen}
          options={{
            headerShown: true,
            headerTitle: 'Unidades Curriculares',
            headerStyle: {
              backgroundColor: '#0d6efd',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
        <Stack.Screen 
          name="MallaCurricular" 
          component={MallaCurricularScreen}
          options={{
            headerShown: true,
            headerTitle: 'Gestionar Malla Curricular',
            headerStyle: {
              backgroundColor: '#0d6efd',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
        <Stack.Screen 
          name="Espacios" 
          component={EspaciosScreen}
          options={{
            headerShown: true,
            headerTitle: 'Gestionar Espacios',
            headerStyle: {
              backgroundColor: '#0d6efd',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
        <Stack.Screen 
          name="Docente" 
          component={DocenteScreen}
          options={{
            headerShown: true,
            headerTitle: 'Gestionar Docente',
            headerStyle: {
              backgroundColor: '#0d6efd',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
        <Stack.Screen 
          name="Seccion" 
          component={SeccionScreen}
          options={{
            headerShown: true,
            headerTitle: 'Gestionar Sección',
            headerStyle: {
              backgroundColor: '#0d6efd',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
