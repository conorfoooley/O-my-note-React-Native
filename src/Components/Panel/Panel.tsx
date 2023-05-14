import React, { ReactNode, memo } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import { Loader } from 'app/Components';
import { Colors, Metrics } from 'app/Theme';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

const Panel = ({ children, style, isLoading }: Props) => (
  <View style={[styles.panel, style]}>{isLoading ? <Loader fullHeight /> : children}</View>
);

const styles = StyleSheet.create({
  panel: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: Metrics.panelBorderRadius,
    borderTopRightRadius: Metrics.panelBorderRadius,
    borderWidth: 1,
    borderColor: Colors.greyScaleTwo,
    height: '100%',
  },
});

export default memo(Panel);
