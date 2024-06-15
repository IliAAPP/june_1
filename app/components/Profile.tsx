import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProgressBar } from 'react-native-paper';

const Profile = ({ navigation }) => {
  const [progress, setProgress] = useState(0.33);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Профиль</Text>
      </View>
      <View style={styles.form}>
        <Image style={styles.avatar} source={require('../../assets/ava.png')} />
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.infoText}>
              Имя: Илья
            </Text>
            <Icon name="pencil" size={18} color="#000" style={styles.editIcon} />
          </View>

          <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.infoText}>
              Фамилия: Апполонов
            </Text>
            <Icon name="pencil" size={18} color="#000" style={styles.editIcon} />
          </View>

          <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.infoText}>
              Должность: Прораб
            </Text>
            <Icon name="pencil" size={18} color="#000" style={styles.editIcon} />
          </View>
          <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
              <Text style={styles.infoText}>
                Количество управляемых бригад: 3
              </Text>
              <Icon name="pencil" size={18} color="#000" style={styles.editIcon} />
          </View>
        </View>
        <Text style={styles.label}>Ваш рабочий участок: г.Краснодар, ул.Парусная 33</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Прогресс выполнения задач:</Text>
          <ProgressBar progress={progress} color="#d32f2f" style={styles.progressBar} />
          <Text style={styles.progressPercentage}>{(progress * 100).toFixed(0)}%</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.logoutButton}>
            <Text style={styles.logoutText}>Выйти</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 20,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  infoContainer: {
    marginBottom: 20,

  },
  infoText: {
    fontSize: 18,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 5,
  },
  infoText2: {
    fontSize: 18,
    paddingVertical: 7,
    opacity: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginTop: 60,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 70,
    alignSelf: 'center',
    marginBottom: 30,
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  progressPercentage: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 100,
  },
  logoutText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Profile;
