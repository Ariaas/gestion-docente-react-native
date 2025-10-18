import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import UnidadCurricularScreen from './screens/UnidadCurricularScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
