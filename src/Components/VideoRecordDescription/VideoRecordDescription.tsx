import React, { memo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Metrics, Colors, Fonts } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const VideoRecordDescription = ({ style }: Props) => {
  return (
    <View style={[styles.descriptionContainer, style]}>
      <Text style={styles.descriptionTitle}>{translate('videoRecordDescriptionTitle')}</Text>
      <Text style={styles.descriptionText}>{translate('videoRecordDescriptionText')}</Text>
    </View>
  );
};

export default memo(VideoRecordDescription);

const styles = StyleSheet.create({
  descriptionContainer: {
    backgroundColor: Colors.videoRecordDecriptionBackground,
    paddingVertical: 20,
    paddingHorizontal: Metrics.mediumMargin,
    borderRadius: Metrics.largeBorderRadius,
  },
  descriptionTitle: {
    ...Fonts.style.headerSmallerBlack,
    color: Colors.greyScaleOne,
    paddingBottom: Metrics.smallerMargin,
  },
  descriptionText: {
    ...Fonts.style.normal,
    color: Colors.greyScaleOne,
  },
});
