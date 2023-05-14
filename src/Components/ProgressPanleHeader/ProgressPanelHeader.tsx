import React, { ReactNode, memo } from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';

import { ProgressPanelHeaderStep } from 'app/Constants/enums';
import { Colors, Metrics, Fonts } from 'app/Theme';
import { translate } from 'app/translations';

interface Props {
  progress: number;
  perfumeCategoryPicker?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ProgressPanelHeader = ({ progress, perfumeCategoryPicker, style }: Props) => {
  return (
    <View style={[styles.container, style, !!perfumeCategoryPicker && styles.extraHeight]}>
      <View style={styles.dotsContainer}>
        <View>
          <View
            style={[
              styles.dot,
              (progress === ProgressPanelHeaderStep.StoryTime && styles.activeDot) ||
                (progress === ProgressPanelHeaderStep.Ingredients && styles.activeDot) ||
                (progress === ProgressPanelHeaderStep.Recommendation && styles.activeDot),
            ]}
          >
            <Text
              style={[
                styles.dotText,
                (progress === ProgressPanelHeaderStep.StoryTime && styles.activeDotText) ||
                  (progress === ProgressPanelHeaderStep.Ingredients && styles.activeDotText) ||
                  (progress === ProgressPanelHeaderStep.Recommendation && styles.activeDotText),
              ]}
            >
              {ProgressPanelHeaderStep.StoryTime}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={[
              styles.dot,
              (progress === ProgressPanelHeaderStep.Ingredients && styles.activeDot) ||
                (progress === ProgressPanelHeaderStep.Recommendation && styles.activeDot),
            ]}
          >
            <Text
              style={[
                styles.dotText,
                (progress === ProgressPanelHeaderStep.Ingredients && styles.activeDotText) ||
                  (progress === ProgressPanelHeaderStep.Recommendation && styles.activeDotText),
              ]}
            >
              {ProgressPanelHeaderStep.Ingredients}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={[styles.dot, progress === ProgressPanelHeaderStep.Recommendation && styles.activeDot]}
          >
            <Text
              style={[
                styles.dotText,
                progress === ProgressPanelHeaderStep.Recommendation && styles.activeDotText,
              ]}
            >
              {ProgressPanelHeaderStep.Recommendation}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.textsContainer}>
        <View style={[styles.textContainer]}>
          <Text
            style={[
              styles.titleText,
              (progress === ProgressPanelHeaderStep.StoryTime && styles.activeTitleText) ||
                (progress === ProgressPanelHeaderStep.Ingredients && styles.activeTitleText) ||
                (progress === ProgressPanelHeaderStep.Recommendation && styles.activeTitleText),
            ]}
          >
            {translate('progressPanelHeaderStoryTime')}
          </Text>
        </View>
        <View style={[styles.textContainer]}>
          <Text
            style={[
              styles.titleText,
              (progress === ProgressPanelHeaderStep.Ingredients && styles.activeTitleText) ||
                (progress === ProgressPanelHeaderStep.Recommendation && styles.activeTitleText),
            ]}
          >
            {translate('progressPanelHeaderIngredients')}
          </Text>
        </View>
        <View style={[styles.textContainer]}>
          <Text
            numberOfLines={1}
            style={[
              styles.titleText,
              progress === ProgressPanelHeaderStep.Recommendation && styles.activeTitleText,
            ]}
          >
            {translate('progressPanelHeaderRecommendation')}
          </Text>
        </View>
      </View>
      <View style={styles.pickerContainer}>{perfumeCategoryPicker}</View>
    </View>
  );
};

export default memo(ProgressPanelHeader);

const styles = StyleSheet.create({
  container: {
    height: 72,
    backgroundColor: Colors.greyScaleTwo,
    borderTopLeftRadius: Metrics.largeBorderRadius,
    borderTopRightRadius: Metrics.largeBorderRadius,
    paddingTop: Metrics.mediumMargin,
    borderWidth: 1,
    borderColor: Colors.greyScaleTwo,
  },
  dotsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  dot: {
    width: Metrics.mediumMargin,
    height: Metrics.mediumMargin,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.margin,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.greyScaleFour,
  },
  activeDot: {
    backgroundColor: Colors.primaryGold,
    borderWidth: 0,
  },
  dotText: {
    ...Fonts.style.tinySemiBold,
    fontSize: 9,
    color: Colors.greyScaleFour,
    textAlign: 'center',
  },
  activeDotText: {
    color: Colors.greyScaleOne,
  },
  titleText: {
    ...Fonts.style.xsmallMedium,
    lineHeight: Metrics.mediumMargin,
    color: Colors.greyScaleFour,
    textAlign: 'center',
  },
  activeTitleText: {
    color: Colors.greyScaleSix,
  },
  pickerContainer: { marginBottom: Metrics.margin },
  extraHeight: { height: 120 },
});
