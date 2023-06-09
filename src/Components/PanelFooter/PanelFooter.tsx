import React, { memo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from 'app/Components';
import { translate } from 'app/translations/translationHelpers';

import { Colors, Metrics } from '../../Theme';

interface Props {
  onPressLeftButton?: () => void;
  onPressRightButton?: () => void;
  onPressExit?: () => void;
  remove?: boolean;
  back?: boolean;
  next?: boolean;
  disableRight?: boolean;
  style?: StyleProp<ViewStyle>;
  leftButtonAsSecondary?: boolean;
}

const PanelFooter = ({
  onPressLeftButton,
  onPressRightButton,
  onPressExit,
  remove,
  back,
  next,
  disableRight,
  style,
  leftButtonAsSecondary,
}: Props) => {
  return (
    <SafeAreaView edges={['bottom']} style={[styles.header, style]}>
      {onPressLeftButton && remove && (
        <Button style={styles.button} ghost text={translate('delete')} onPress={onPressLeftButton} />
      )}

      {onPressLeftButton && back && (
        <Button
          style={styles.button}
          iconLeft
          textStyle={styles.backButtonText}
          iconColor={Colors.greyScaleSix}
          text={translate('previous')}
          onPress={onPressLeftButton}
        />
      )}

      {onPressExit && (
        <Button
          style={styles.button}
          ghost={!leftButtonAsSecondary}
          secondary={leftButtonAsSecondary}
          text={translate('exit')}
          onPress={onPressExit}
        />
      )}

      {onPressRightButton && (
        <Button
          style={styles.button}
          secondary
          text={translate(next ? 'next' : 'saveAndExit')}
          onPress={onPressRightButton}
          disabled={disableRight}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: Metrics.button,
  },
  header: {
    paddingTop: Metrics.mediumMargin,
    paddingBottom: Metrics.mediumMargin,
    paddingHorizontal: Metrics.mediumMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Metrics.screenWidth,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.greyScaleTwo,
    borderTopLeftRadius: Metrics.largeBorderRadius,
    borderTopRightRadius: Metrics.largeBorderRadius,
    borderWidth: 1,
    borderColor: Colors.greyScaleTwo,
  },
  backButtonText: { color: Colors.greyScaleSix },
});

export default memo(PanelFooter);
