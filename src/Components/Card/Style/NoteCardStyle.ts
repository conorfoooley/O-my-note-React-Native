import { StyleSheet } from 'react-native';

import { Typography } from 'app/Theme';

import { Colors, Fonts, Metrics } from '../../../Theme';

export default StyleSheet.create({
  card: {
    width: Metrics.noteCardWidth,
    aspectRatio: 106 / 116,
    marginHorizontal: Metrics.smallMargin,
    backgroundColor: Colors.greyScaleOne,
    marginBottom: Metrics.margin,
    borderRadius: Metrics.mediumBorderRadius,
  },
  selectedCard: {
    backgroundColor: Colors.lightBlue,
  },
  swiper: {
    flex: 1.3,
  },
  image: {
    width: Metrics.noteCardImageWidth,
    aspectRatio: 94 / 72,
    borderRadius: Metrics.tinyBorderRadius,
    alignSelf: 'center',
    marginTop: Metrics.smallMargin,
  },
  detail: {
    flex: 0.9,
    paddingVertical: Metrics.baseMargin / 3,
    justifyContent: 'space-around',
    paddingBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin * 1.5,
  },
  description: {
    alignSelf: 'flex-start',
    ...Fonts.style.helper,
  },
  price: {
    alignSelf: 'flex-start',
    ...Fonts.style.h3,
    fontWeight: 'bold',
    color: Colors.main,
    marginBottom: -20,
  },
  btnText: {
    alignSelf: 'center',
    color: Colors.white,
    ...Fonts.style.normal,
    fontWeight: '400',
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonStyle: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  checkedConfirm: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    right: -10,
  },
  uncheckedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.black,
    width: '100%',
    height: '100%',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    ...Fonts.style.helper,
    color: Colors.greyScaleSix,
    lineHeight: Typography.smallLineHeight,
    textAlign: 'center',
  },
  uncheckedText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.main,
  },
});
