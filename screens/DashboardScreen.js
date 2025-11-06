import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DashboardHeader from '../components/DashboardHeader';
import DashboardCard from '../components/DashboardCard';

export default function DashboardScreen({ navigation }) {
  const dashboardItems = [
    { id: 1, title: 'Docentes', icon: '👨‍🏫', screen: 'Docente' },
    { id: 2, title: 'Espacios', icon: '🔧', screen: 'Espacios' },
    { id: 3, title: 'Seccion', icon: '👥', screen: 'Seccion' },
    { id: 4, title: 'Unidad Curricular', icon: '📚', screen: 'UnidadCurricular' },
    { id: 5, title: 'Malla Curricular', icon: '📋', screen: 'MallaCurricular' },
  ];

  const handleCardPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else {
      console.log(`Funcionalidad pendiente: ${item.title}`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader userName="Usuario" />

        <View style={styles.cardsContainer}>
          {dashboardItems.map((item) => (
            <DashboardCard
              key={item.id}
              title={item.title}
              icon={item.icon}
              onPress={() => handleCardPress(item)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
});
