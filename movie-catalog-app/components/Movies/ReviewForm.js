import React from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { Rating } from '@rneui/themed';
import { useTheme } from '@rneui/themed';

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(3);
  const [text, setText] = useState('');
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit({ text, rating });
      setText('');
      setRating(3);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.grey1 }]}>
      <Rating
        type="star"
        startingValue={rating}
        imageSize={30}
        onFinishRating={setRating}
        style={styles.rating}
      />
      <TextInput
        placeholder="Escribe tu reseña..."
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={4}
        style={[
          styles.input, 
          { 
            backgroundColor: theme.colors.background,
            color: theme.colors.onBackground,
            borderColor: theme.colors.grey3,
          }
        ]}
      />
      <Button
        title="Enviar reseña"
        onPress={handleSubmit}
        color={theme.colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  rating: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
});