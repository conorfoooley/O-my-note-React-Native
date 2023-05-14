import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Button } from 'app/Components';
import { Colors, Metrics, Fonts } from 'app/Theme';

interface Props {
  type: string;
  iconName: string;
  text: string;
  onSelect: (type: string) => void;
}

const SelectStoryTypeItem = ({ type, iconName, text, onSelect }: Props) => {
  const handlePress = () => onSelect(type);
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Button
        primary
        iconOnlyBig
        iconName={iconName}
        iconOnlyBigSize={20}
        style={styles.button}
        onPress={handlePress}
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Metrics.selectStoryTypeItemHeight,
    width: Metrics.selectStoryTypeItemWidth,
    backgroundColor: Colors.greyScaleOne,
    borderRadius: Metrics.largeBorderRadius,
    alignItems: 'center',
    paddingTop: Metrics.largeMargin,
    marginBottom: Metrics.mediumMargin,
  },
  text: {
    color: Colors.greyScaleSix,
    ...Fonts.style.regularMedium,
    width: '72%',
    textAlign: 'center',
  },
  button: {
    marginBottom: Metrics.largeMargin,
  },
});

export default memo(SelectStoryTypeItem);
