import React, { useCallback, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as types from 'app/Constants/types';
import { Colors } from 'app/Theme';

interface Props {
  onPressAction: () => void;
  small?: boolean;
  fav?: boolean | types.Perfume;
}

const PerfumeCardHeart = ({ onPressAction, small, fav }: Props) => {
  const handlePress = useCallback(() => onPressAction(), [onPressAction]);

  const Container: any = small ? TouchableOpacity : View;

  return (
    <Container onPress={handlePress} style={styles.heartContainer}>
      <Icon size={20} name={fav ? 'heart' : 'heart-o'} color={Colors.navyBlue} />
    </Container>
  );
};
const styles = StyleSheet.create({
  heartContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    right: 17,
  },
});

export default memo(PerfumeCardHeart);
