import React from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { Loader } from 'app/Components';
import HeaderBlue from 'app/Components/Header/HeaderBlue';
import { Colors, Metrics } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

interface Props {
  screenTitle: string;
  statusBarType?: null | StatusBarStyle;
  isLoading?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export class BlueHeaderScreenTemplate extends React.PureComponent<Props> {
  render() {
    const { screenTitle, isLoading, footer, statusBarType, children } = this.props;
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View style={styles.mainContainer}>
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
              <StatusBar
                backgroundColor={Colors.navyBlue}
                barStyle={statusBarType ? statusBarType : 'dark-content'}
                translucent
              />
              <HeaderBlue title={screenTitle} noMarginBottom />
            </SafeAreaView>
            <KeyboardAvoidingView
              style={styles.contentContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={insets ? -insets?.bottom : 0}
            >
              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <Text style={styles.text}>{translate('tellUs')}</Text>
                {isLoading ? <Loader fullHeight /> : children}
              </ScrollView>
              <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.footer}>
                {footer}
              </SafeAreaView>
            </KeyboardAvoidingView>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

export default BlueHeaderScreenTemplate;

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.navyBlue, flex: 1 },
  container: {
    backgroundColor: Colors.navyBlue,
  },
  contentContainer: {
    flexGrow: 1,
    borderTopLeftRadius: Metrics.panelBorderRadius,
    borderTopRightRadius: Metrics.panelBorderRadius,
    backgroundColor: Colors.backgroundPrimary,
  },
  footer: {
    padding: Metrics.mediumMargin,
    borderTopLeftRadius: Metrics.largeBorderRadius,
    borderTopRightRadius: Metrics.largeBorderRadius,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.greyScaleTwo,
  },
  text: {
    paddingBottom: 8,
    paddingTop: 26,
    paddingHorizontal: 16,
    textAlign: 'center',
    color: Colors.blue,
  },
});
