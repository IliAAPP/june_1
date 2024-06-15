import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-elements/dist/checkbox/CheckBox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const tasks = [
  { id: '1', date: new Date(2024, 5, 17), title: 'Залить фундамент для нового здания', project: 'Бригада 1' },
  { id: '2', date: new Date(2024, 5, 18), title: 'Установить опалубку для стен', project: 'Бригада 2' },
  { id: '3', date: new Date(2024, 5, 18), title: 'Проложить электропроводку на первом этаже', project: 'Бригада 1' },
  { id: '4', date: new Date(2024, 5, 19), title: 'Проверить качество сварных швов', project: 'Бригада 1' },
  { id: '5', date: new Date(2024, 5, 20), title: 'Начать кладку внешних стен', project: 'Бригада 2' },
  { id: '6', date: new Date(2024, 5, 20), title: 'Установить оконные блоки на втором этаже', project: 'Бригада 2' },
  { id: '7', date: new Date(2024, 5, 21), title: 'Завершить укладку кровли', project: 'Бригада 1' },
];


const formatDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('ru-RU', options);
};

const Calendar = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskStates, setTaskStates] = useState(tasks.map(task => ({ ...task, completed: false })));
  const [refreshKey, setRefreshKey] = useState(0); // Добавляем ключ для обновления

  const refreshPage = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1); // Обновляем ключ, чтобы принудительно обновить компонент
  }, []);

  const backToMenu = () => {
    navigation.goBack()
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const toggleCheckbox = (id) => {
    setTaskStates(taskStates.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const filteredTasks = taskStates.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatDate(task.date).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={[styles.taskItem, item.completed && styles.taskItemCompleted]}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDate}>{formatDate(item.date)}</Text>
        <Text style={styles.taskProject}>{item.project}</Text>
      </View>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleCheckbox(item.id)}
        checkedColor='green' // Установка цвета галочки
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} key={refreshKey}>
      <View style={styles.header}>
        <TouchableOpacity onPress={backToMenu}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <Text style={styles.headerText}>Задачи на ближайшую неделю</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={refreshPage}>
          <Icon name="refresh" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск по задачам..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noResultsText}>Нет задач для отображения</Text>}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#d32f2f',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDate: {
    fontSize: 14,
    color: '#666',
  },
  taskProject: {
    fontSize: 14,
    color: '#666',
  },
  noResultsText: {
    padding: 15,
    textAlign: 'center',
    color: '#666',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskItemCompleted: {
    backgroundColor: '#d4edda', // Светло-зеленый фон для завершенных задач
  },
});

export default Calendar;
