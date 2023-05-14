import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

import { Colors, Fonts } from 'app/Theme';

interface Props extends PickerSelectProps {}

const Picker = (props: Props) => (
  <RNPickerSelect
    useNativeAndroidPickerStyle={false}
    placeholder={{}}
    style={{
      viewContainer: styles.container,
      inputAndroidContainer: styles.container,
      inputAndroid: styles.text,
      inputIOS: styles.text,
    }}
    {...props}
  />
);

export default Picker;

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.greyScaleOne,
    borderRadius: 12,
  },
  text: {
    ...Fonts.style.input,
    paddingLeft: 12,
    paddingRight: 12,
  },
});
