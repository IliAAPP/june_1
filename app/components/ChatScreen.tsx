import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // используем иконки Ionicons

const ChatScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Входящие');
  const [messages, setMessages] = useState({
    'Входящие': [
      { text: 'Поставка цемента', image: require('../../assets/convert.jpg') },
      { text: 'Монтаж окон', image: require('../../assets/convert.jpg') },
      { text: 'Проверка качества бетона', image: require('../../assets/convert.jpg') }
    ],
    'Помеченные': [
      { text: 'Закупка арматуры', image: require('../../assets/convert.jpg') },
      { text: 'Аренда техники', image: require('../../assets/convert.jpg') }
    ],
    'Отложенные': [
      { text: 'Ремонт площадки', image: require('../../assets/convert.jpg') }
    ],
    'Отправленные': [
      { text: 'Отчет по работам', image: require('../../assets/convert.jpg') },
      { text: 'Запрос на сырье', image: require('../../assets/convert.jpg') }
    ],
    'Черновики': [
      { text: 'Проект сметы', image: require('../../assets/convert.jpg') },
      { text: 'Планирование сроков', image: require('../../assets/convert.jpg') },
      { text: 'Обучение работников', image: require('../../assets/convert.jpg') }
    ],
    'Ещё': [
      { text: 'Инструкции по ТБ', image: require('../../assets/convert.jpg') },
      { text: 'Контакты поставщиков', image: require('../../assets/convert.jpg') }
    ]
  });

  const handleDelete = (tab, index) => {
    const newMessages = { ...messages };
    newMessages[tab].splice(index, 1);
    setMessages(newMessages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {Object.keys(messages).map((key) => (
          <TouchableOpacity key={key} onPress={() => setSelectedTab(key)} style={styles.menuItem}>
            <Text style={styles.menuText}>{key}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Main')}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.header}>{selectedTab}</Text>
        <FlatList
          data={messages[selectedTab]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.messageContainer}>
              <View style={styles.messageRow}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.item}>{item.text}</Text>
                <TouchableOpacity onPress={() => handleDelete(selectedTab, index)} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>×</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F8F7',
    paddingTop: 50, // увеличиваем отступ сверху
  },
  sidebar: {
    width: 180,
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 10,
    paddingVertical: 50,
  },
  header: {
    fontSize: 26,
    marginBottom: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  messageContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginRight: 15,
  },
  item: {
    fontSize: 18,
    flex: 1,
    color: '#333',
  },
  deleteButton: {
    marginLeft: 15,
  },
  deleteText: {
    fontSize: 24,
    color: 'red',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  backButton: {
    padding: 15,
  },
});

export default ChatScreen;
