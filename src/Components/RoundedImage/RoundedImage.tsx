import React from 'react';
import { StyleSheet, Image, StyleProp, ImageStyle } from 'react-native';

import { Metrics, Colors } from 'app/Theme';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

const RoundedImage = ({ uri, style }: Props) => {
  return <Image style={[styles.image, style]} source={{ uri }} />;
};

const styles = StyleSheet.create({
  image: {
    width: Metrics.perfumeLogo,
    height: Metrics.perfumeLogo,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    borderRadius: Metrics.largeBorderRadius,
  },
});

export default React.memo(RoundedImage);
