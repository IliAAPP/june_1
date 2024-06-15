import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const DocumentList = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const scale = new Animated.Value(1);

  const documents = [
    { id: '1', type: 'Фундамент', title: 'Чертеж фундамента здания', icon: 'description', image: require('../../assets/ch1.png') },
    { id: '2', type: 'Архитектурный', title: 'План фасада', icon: 'article', image: require('../../assets/ch2.jpg') },
    { id: '3', type: 'Конструктивный', title: 'Чертеж перекрытий', icon: 'description', image: require('../../assets/ch3.png') },
    { id: '4', type: 'Инженерный', title: 'Схема вентиляции', icon: 'description', image: require('../../assets/ch4.jpeg') },
    { id: '5', type: 'Электрический', title: 'Электрическая схема освещения', icon: 'description', image: require('../../assets/ch5.png') },
    { id: '6', type: 'Сантехнический', title: 'Схема водоснабжения', icon: 'article', image: require('../../assets/ch6.jpeg') },
    { id: '7', type: 'Деталировка', title: 'Деталь чертежа балкона', icon: 'article', image: require('../../assets/ch7.jpeg') },
  ];

  const handlePress = (item) => {
    setSelectedDocument(item);
    setModalVisible(true);
  };

  const renderDocument = ({ item }) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.documentItem} 
      onPress={() => handlePress(item)}
    >
      <MaterialIcons name={item.icon} size={24} color="#000" style={styles.icon} />
      <Text style={styles.documentText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Чертежи и документация</Text>
      </View>
      <View style={styles.documentList}>
        {documents.map((item) => renderDocument({ item }))}
      </View>

      {selectedDocument && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <PinchGestureHandler
                onGestureEvent={onPinchEvent}
                onHandlerStateChange={onPinchStateChange}
              >
                <Animated.Image
                  source={selectedDocument.image}
                  style={[styles.modalImage, { transform: [{ scale: scale }] }]}
                  resizeMode="contain"
                />
              </PinchGestureHandler>
              <Text style={styles.modalText}>{selectedDocument?.title}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    justifyContent: 'space-around'
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  documentList: {
    flex: 1,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  documentText: {
    flex: 1,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '95%',
    height: '55%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
    justifyContent: 'space-around', // Обеспечивает равномерное распределение содержимого
    paddingTop: 20, // Увеличивает отступ сверху
    paddingBottom: 70, // Увеличивает отступ снизу для предотвращения перекрытия кнопкой
    
  },
  modalImage: {
    width: '100%',
    height: '90%',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16, // Увеличивает размер шрифта, если необходимо
    marginHorizontal: 20, // Добавляет горизонтальные отступы
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    marginVertical: 10,
    alignSelf: 'center', // Центрирует кнопку в модальном окне
    position: 'absolute', // Позиционирование относительно модального окна
    bottom: 20, // Отступ снизу, чтобы кнопка не выходила за пределы
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  }
});

export default DocumentList;
