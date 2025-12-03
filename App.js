import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import UnidadCurricularScreen from './screens/UnidadCurricularScreen';
import MallaCurricularScreen from './screens/MallaCurricularScreen';
import EspaciosScreen from './screens/EspaciosScreen';
import DocenteScreen from './screens/DocenteScreen';
import SeccionScreen from './screens/SeccionScreen';
import RecoverPasswordScreen from './screens/RecoverPasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SecurityScreen from './screens/SecurityScreen';

const Stack = createNativeStackNavigator();

function AppContent() {
  const { theme, isDarkMode } = useTheme();

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{
            headerShown: true,
            headerTitle: 'Inicio',
          }}
        />
        <Stack.Screen 
          name="UnidadCurricular" 
          component={UnidadCurricularScreen}
          options={{
            headerShown: true,
            headerTitle: 'Unidades Curriculares',
          }}
        />
        <Stack.Screen 
          name="MallaCurricular" 
          component={MallaCurricularScreen}
          options={{
            headerShown: true,
            headerTitle: 'Malla Curricular',
          }}
        />
        <Stack.Screen 
          name="Espacios" 
          component={EspaciosScreen}
          options={{
            headerShown: true,
            headerTitle: 'Espacios',
          }}
        />
        <Stack.Screen 
          name="Docente" 
          component={DocenteScreen}
          options={{
            headerShown: true,
            headerTitle: 'Docentes',
          }}
        />
        <Stack.Screen 
          name="Seccion" 
          component={SeccionScreen}
          options={{
            headerShown: true,
            headerTitle: 'Secciones',
          }}
        />
        <Stack.Screen 
          name="RecoverPassword" 
          component={RecoverPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerTitle: 'Mi Perfil',
          }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{
            headerShown: true,
            headerTitle: 'Editar Perfil',
          }}
        />
        <Stack.Screen 
          name="Notifications" 
          component={NotificationsScreen}
          options={{
            headerShown: true,
            headerTitle: 'Notificaciones',
          }}
        />
        <Stack.Screen 
          name="Security" 
          component={SecurityScreen}
          options={{
            headerShown: true,
            headerTitle: 'Seguridad',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { UserProvider } from './context/UserContext';



export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}
