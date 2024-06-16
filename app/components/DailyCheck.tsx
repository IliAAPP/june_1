import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DailyCheck = () => {
  const navigation = useNavigation();
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateText = async () => {
    if (question) {
      try {
        const response = await fetch("http://10.2.0.95:8000/generate_text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResult(data);
        setError(null);
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
        <Text style={{ marginVertical: 20 }}>Пожалуйста, задайте вопрос:</Text>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Введите ваш вопрос"
          style={{ marginVertical: 20, borderWidth: 1, padding: 10, borderRadius: 5 }}
        />
        <Button
          title="Сгенерировать ответ"
          onPress={handleGenerateText}
        />
        {result && (
          <View style={{ marginTop: 20, padding: 15, backgroundColor: '#F8F8F7' }}>
            <Text style={{ padding: 5 }}>Сгенерированный ответ:</Text>
            <Text style={{ padding: 5 }}>{result.generated_text}</Text>
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
