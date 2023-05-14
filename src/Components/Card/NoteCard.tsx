import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import * as types from '../../Constants/types';
import { Image } from '../Image/Image';
import styles from './Style/NoteCardStyle';

interface Props {
  note: types.Note;
  selected?: boolean | undefined;
  disabled?: boolean;
  onPress?: (note: types.Note) => void;
}

const NoteCard = ({ note, selected, disabled, onPress }: Props) => {
  const handlePress = () => onPress && onPress(note);

  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selectedCard]}
      onPress={handlePress}
      activeOpacity={disabled ? 1.0 : 0.2}
    >
      <Image
        style={styles.image}
        source={
          note?.image
            ? { uri: note.image }
            : note?.featured_image?.image
            ? { uri: note.featured_image.image }
            : require('../../Assets/Images/perfume.png')
        }
      />

      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={2}>
          {note.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoteCard;
