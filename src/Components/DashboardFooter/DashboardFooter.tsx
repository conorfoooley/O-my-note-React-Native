import React, { useCallback, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from 'app/Components';
import * as types from 'app/Constants/types';
import { Route } from 'app/Navigators';
import { Colors, Metrics, Fonts } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

interface Props {
  navigation: types.NavigationProp<Route.Dashboard, types.NavigationParams[Route.Dashboard]>;
}

const DashboardFooter = ({ navigation }: Props) => {
  const handlePress = useCallback(() => navigation.navigate(Route.SelectStoryType), [navigation]);
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{translate('dashboardFooterTitle')}</Text>
        <Text style={styles.description}>{translate('dashboardFooterDescription')}</Text>
      </View>
      <Button secondary iconOnlyBig onPress={handlePress} style={styles.button} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.navyBlue,
    borderTopLeftRadius: Metrics.largeBorderRadius,
    borderTopRightRadius: Metrics.largeBorderRadius,
    paddingVertical: Metrics.mediumMargin,
    paddingHorizontal: Metrics.largeMargin,
  },
  textContainer: { flex: 0.7 },
  title: { ...Fonts.style.h2, color: Colors.greyScaleOne, marginBottom: 8 },
  description: { ...Fonts.style.normal, color: Colors.greyScaleFour },
  button: { top: 22 },
});

export default memo(DashboardFooter);
