import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const navigation = useNavigation();

  const handlePress = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Главное меню</Text>
      </View>
      <View style={styles.grid}>
        {[
          { label: 'Профиль', icon: '🏠', route: 'Profile' },
          { label: 'Мои чаты', icon: '✏️', route: 'Chats' },
          { label: 'Календарь', icon: '📆', route: 'Calendar' },
          { label: 'Проверка', icon: '✅', route: 'DailyCheck' },
          { label: 'Чертежи', icon: '🗺️', route: 'Chertez' },
          { label: 'Техника', icon: '🚜', route: 'Technika' },
        ].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.gridItem} 
            onPress={() => handlePress(item.route)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center', // Центрирует содержимое по вертикали
    padding: 15
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerText: {
    color: '#2B261D',
    fontSize: 24,
    fontWeight: 'bold',

  },
  grid: {
    alignItems: 'center', // Центрирует квадратики по горизонтали
    width: '100%', // Занимает всю ширину
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
  },
  gridItem: {
    width: '40%', // Увеличиваем ширину квадратиков
    marginVertical: 10, // Добавляем вертикальные отступы
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#34495e',
    backgroundColor: '#F8F8F7', // Обновленный фоновый цвет квадратиков
    padding: 25, 
    paddingVertical: 35,
    borderRadius: 30,
    marginHorizontal: 8
    
    
  },

  highlight: {
    backgroundColor: '#f39c12',
  },

  icon: {
    fontSize: 24,
  },
  label: {
    color: '#2B261D',
    marginTop: 10,
    fontSize: 20,
  },
});

export default Main;
