import React, { PureComponent, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';

import { translate } from 'app/translations/translationHelpers';

import { Colors, Metrics, Fonts } from '../../Theme';
import Icons from './Icons';

export interface HeaderBlueProps {
  title?: string;
  navigation: NavigationStackProp;
  noMarginBottom?: boolean;
}

class HeaderBlue extends PureComponent<HeaderBlueProps> {
  static defaultProps: Partial<HeaderBlueProps> = {
    title: translate('headerBlueDefaultTitle'),
  };

  handleOnPressRightIcon = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { title, noMarginBottom } = this.props;

    return (
      <View style={[styles.header, noMarginBottom && styles.headerNoMargin]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightIconContainer}>
          <Icons color={Colors.greyScaleOne} onPress={this.handleOnPressRightIcon} name="x" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    paddingHorizontal: Metrics.mediumMargin,
    backgroundColor: Colors.navyBlue,
    marginBottom: Metrics.largeMargin,
  },
  headerNoMargin: {
    marginBottom: 0,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: Colors.greyScaleOne,
    ...Fonts.style.headerTitle,
  },
  rightIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default withNavigation(memo(HeaderBlue));
