import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Импортируйте хук useNavigation

const DailyCheck = () => {
  const navigation = useNavigation(); // Используйте хук useNavigation
  const [videoPath, setVideoPath] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (videoPath) {
      try {
        const response = await fetch("http://172.20.10.2:8080/detect_objects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video_path: videoPath }),
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResult(data);  // Установите данные в состояние
        setError(null);  // Очистите ошибки
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        setError('Ошибка при отправке запроса');
      }
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 40, left: 20 }}>
        <Text style={{ color: 'blue', fontSize: 18 }}>Назад</Text>
      </TouchableOpacity>
      
      <View style={{ marginTop: 100, padding: 20 }}>
        <Text style={{ marginVertical: 20 }}>Не забудь провести ежедневную проверку рабочих!</Text>
        <TextInput
          value={videoPath}
          onChangeText={setVideoPath}
          placeholder="Введите путь к файлу"
          style={{ marginVertical: 20 }}
        />
        <Button
          title="Анализировать"
          onPress={handleAnalyze}
        />
        {result && (
          <View style={{ marginTop: 20, padding: 15, backgroundColor: '#F8F8F7'}}>
            <Text style={{padding: 5}}>Результаты анализа:</Text>
            <Text style={{padding: 5}}>Процент соблюдения техники безопасности: {(result.hardhat_ratio * 100).toFixed(2)}%</Text>
            <Text style={{padding: 5}}>Комментарий: {result.comment}</Text>
          </View>
        )}
        {error && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default DailyCheck;
