import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Divider from 'app/Assets/Images/divider.svg';
import OnboardingFirst from 'app/Assets/Images/onboarding_1.svg';
import OnboardingSecond from 'app/Assets/Images/onboarding_2.svg';
import OnboardingThird from 'app/Assets/Images/onboarding_3.svg';
import OnboardingFourth from 'app/Assets/Images/onboarding_4.svg';
import * as enums from 'app/Constants/enums';
import { Colors, Metrics, Fonts } from 'app/Theme';

interface Props {
  index: number;
  title: string;
  description: string;
  descriptionSecondary: string;
}
const SLIDE_WIDTH = 250;
const SLIDE_HEIGHT = 280;
const SMALL_SLIDE_WIDTH = 164;
const SMALL_SLIDE_HEIGHT = 181;

const OnboardingSliderItem = ({ index, title, description, descriptionSecondary }: Props) => {
  const descriptionSize =
    Metrics.screenWidth > enums.Screen.WidthThreshold
      ? { ...Fonts.style.regularBase }
      : { ...Fonts.style.helper };
  return (
    <View style={styles.slide}>
      {Metrics.screenWidth > enums.Screen.WidthThreshold ? (
        <>
          {index === 0 ? (
            <OnboardingFirst width={SLIDE_WIDTH} height={SLIDE_HEIGHT} />
          ) : index === 1 ? (
            <OnboardingSecond width={SLIDE_WIDTH} height={SLIDE_HEIGHT} />
          ) : index === 2 ? (
            <OnboardingThird width={SLIDE_WIDTH} height={SLIDE_HEIGHT} />
          ) : (
            index === 3 && <OnboardingFourth width={SLIDE_WIDTH} height={SLIDE_HEIGHT} />
          )}
          <Text style={styles.title}>{title}</Text>
          <Divider style={styles.divider} />
          <Text style={styles.description}>{description}</Text>
          <Text style={[styles.description, styles.descriptionMarginTop]}>{descriptionSecondary}</Text>
        </>
      ) : (
        Metrics.screenWidth <= enums.Screen.WidthThreshold && (
          <>
            <>
              {index === 0 ? (
                <OnboardingFirst width={SMALL_SLIDE_WIDTH} height={SMALL_SLIDE_HEIGHT} />
              ) : index === 1 ? (
                <OnboardingSecond width={SMALL_SLIDE_WIDTH} height={SMALL_SLIDE_HEIGHT} />
              ) : index === 2 ? (
                <OnboardingThird width={SMALL_SLIDE_WIDTH} height={SMALL_SLIDE_HEIGHT} />
              ) : (
                index === 3 && <OnboardingFourth width={SMALL_SLIDE_WIDTH} height={SMALL_SLIDE_HEIGHT} />
              )}
              <Text style={[styles.title, styles.titleSmaller]}>{title}</Text>
              <Divider style={styles.divider} />
              <Text style={[styles.description, descriptionSize]}>{description}</Text>
            </>
            <Text style={[styles.description, descriptionSize, styles.descriptionMarginTop]}>
              {descriptionSecondary}
            </Text>
          </>
        )
      )}
    </View>
  );
};

export default OnboardingSliderItem;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.greyScaleOne,
    ...Fonts.style.h3,
    textAlign: 'center',
  },
  titleSmaller: {
    ...Fonts.style.h3,
  },
  description: {
    color: Colors.greyScaleOne,
    textAlign: 'center',
  },
  divider: { marginTop: Metrics.mediumMargin, marginBottom: Metrics.mediumMargin },
  descriptionMarginTop: {
    marginTop: Metrics.margin,
  },
});
