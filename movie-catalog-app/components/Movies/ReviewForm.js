import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating, Icon } from '@rneui/themed';
import { useTheme } from '@rneui/themed';

export default function ReviewItem({ review, onDelete }) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.colors.grey0,
        borderColor: theme.colors.grey2,
      }
    ]}>
      <View style={styles.header}>
        <Rating
          type="star"
          readonly
          startingValue={review.rating}
          imageSize={15}
          style={styles.rating}
        />
        <Text style={[styles.date, { color: theme.colors.grey5 }]}>
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
        <TouchableOpacity onPress={onDelete}>
          <Icon 
            type="material-community" 
            name="delete" 
            size={20} 
            color={theme.colors.error} 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text 
          style={[styles.text, { color: theme.colors.onBackground }]} 
          numberOfLines={expanded ? undefined : 2}
        >
          {review.text}
        </Text>
        {!expanded && (
          <Text style={[styles.moreText, { color: theme.colors.primary }]}>
            Leer más...
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    flex: 1,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  moreText: {
    fontSize: 12,
    marginTop: 5,
  },
});