import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DashboardHeader from '../components/DashboardHeader';
import DashboardCard from '../components/DashboardCard';

export default function DashboardScreen() {
  const dashboardItems = [
    { id: 1, title: 'Docentes', icon: '👨‍🏫' },
    { id: 2, title: 'Espacios', icon: '🔧' },
    { id: 3, title: 'Seccion', icon: '👥' },
    { id: 4, title: 'Unidad Curricular', icon: '📚' },
    { id: 5, title: 'Malla Curricular', icon: '📋' },
    { id: 6, title: 'Reportes', icon: '📊' },
  ];

  const handleCardPress = (item) => {
    console.log(`Presionado: ${item.title}`);
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
