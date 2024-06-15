import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 1, title: 'Категория 1' },
  { id: 2, title: 'Категория 2' },
  { id: 3, title: 'Категория 3' },
  { id: 4, title: 'Категория 4' },
];

const MyMaterials = () => {
  const navigation = useNavigation();

  const categories = [
    { id: 5, title: 'Категория 5' },
    { id: 6, title: 'Категория 6' },
    { id: 7, title: 'Категория 7' },
    { id: 8, title: 'Категория 8' },
  ];

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'Materials') {
      navigation.navigate('MyMaterials');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{paddingHorizontal: 7}} onPress={() => {}}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{paddingHorizontal: 7}} onPress={() => {}}>
            <Ionicons name="hammer" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => {}}>
            <Ionicons name="time" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => {}}>
            <Ionicons name="albums" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => {}}>
            <Ionicons name="construct" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tabButton, styles.activeTabButton]} 
          onPress={() => navigation.navigate('Technika')}
        >
          <Text style={[styles.tabText, styles.activeTabText]}>Техника</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => {}}
        >
          <Text style={styles.tabText}>Материалы</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categories}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => navigation.navigate('CategoryDetails', { categoryId: category.id })}
          >
            <Ionicons name="folder" size={50} color="#007bff" />
            <Text style={styles.categoryText}>{category.title}</Text>
            <Ionicons name="arrow-forward" size={24} color="#007bff" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 50,  // Adjust this value to move everything down
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  categoryItem: {
    width: '45%',
    backgroundColor: '#F8F8F7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default MyMaterials;
