import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Typography } from 'app/Theme';

interface Props {
  text: string;
}

const VideoUploadSliderItem = ({ text }: Props) => (
  <View style={styles.slide}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default VideoUploadSliderItem;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.greyScaleSix,
    ...Fonts.style.regularMedium,
    textAlign: 'center',
    lineHeight: Typography.mediumLineHeight,
  },
});
