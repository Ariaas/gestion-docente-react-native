import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Card = ({ children, onPress, style }) => {
  const Container = onPress ? TouchableOpacity : View;
  const { theme } = useTheme();

  return (
    <Container 
      style={[
        styles.card, 
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border }, 
        style
      ]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
  },
});

export default Card;
