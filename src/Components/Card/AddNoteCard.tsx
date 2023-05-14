import React, { useCallback, memo } from 'react';
import { View, Text } from 'react-native';

import { Button } from 'app/Components';
import { translate } from 'app/translations/translationHelpers';

import styles from './Style/AddNoteCardStyle';

interface Props {
  onSelect: () => void;
}

const AddNoteCard = ({ onSelect }: Props) => {
  const handlePress = useCallback(() => onSelect(), [onSelect]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {translate('addNote')} <Text style={styles.textBolder}>{translate('addIt')}</Text>
        </Text>
      </View>
      <View style={styles.buttonConatiner}>
        <Button iconName="plus" iconOnlyBig primary style={styles.button} onPress={handlePress} />
      </View>
    </View>
  );
};

export default memo(AddNoteCard);
