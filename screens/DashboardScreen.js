
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DashboardHeader from '../components/DashboardHeader';
import { 
  docentes, 
  espacios, 
  secciones, 
  unidadesCurriculares, 
  mallasCurriculares 
} from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function DashboardScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isMobile = width < 768;
  const numColumns = isMobile ? 1 : 2;
  const gap = 16;
  const padding = 20;
  const cardWidth = (width - (padding * 2) - (gap * (numColumns - 1))) / numColumns;

  const dashboardItems = [
    { 
      id: 1, 
      title: 'Docentes', 
      icon: 'people', 
      screen: 'Docente', 
      color: '#4e73df',
      count: `${docentes.length} Registrados`
    },
    { 
      id: 2, 
      title: 'Espacios', 
      icon: 'business', 
      screen: 'Espacios', 
      color: '#1cc88a',
      count: `${espacios.length} Activos`
    },
    { 
      id: 3, 
      title: 'Secciones', 
      icon: 'easel', 
      screen: 'Seccion', 
      color: '#36b9cc',
      count: `${secciones.length} Asignadas`
    },
    { 
      id: 4, 
      title: 'Unidades', 
      icon: 'book', 
      screen: 'UnidadCurricular', 
      color: '#f6c23e',
      count: `${unidadesCurriculares.length} Totales`
    },
    { 
      id: 5, 
      title: 'Malla', 
      icon: 'git-network', 
      screen: 'MallaCurricular', 
      color: '#e74a3b',
      count: `${mallasCurriculares.length} Activas`
    },
  ];

  const handleCardPress = (item) => {
    navigation.navigate(item.screen);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <DashboardHeader userName="Admin" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {dashboardItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.cardWrapper, 
                { width: isMobile ? '100%' : cardWidth }
              ]}
              onPress={() => handleCardPress(item)}
              activeOpacity={0.9}
            >
              <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <View style={styles.leftColumn}>
                  <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                    <Ionicons name={item.icon} size={32} color={item.color} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Text>
                    <Text style={[styles.cardAction, { color: theme.colors.textSecondary }]}>Acceder</Text>
                  </View>
                </View>
                
                <View style={styles.rightColumn}>
                  <View style={[styles.countContainer, { backgroundColor: item.color + '20' }]}>
                    <Text style={[styles.bigCount, { color: item.color }]}>
                      {item.count.split(' ')[0]}
                    </Text>
                  </View>
                  <Text style={[styles.countLabel, { color: item.color }]}>
                    {item.count.split(' ').slice(1).join(' ')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 0,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    height: 170,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rightColumn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  textContainer: {
    marginTop: 'auto',
  },
  bigCount: {
    fontSize: 28,
    fontWeight: '800',
  },
  countLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'right',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  cardAction: {
    fontSize: 14,
    fontWeight: '600',
  },
});

