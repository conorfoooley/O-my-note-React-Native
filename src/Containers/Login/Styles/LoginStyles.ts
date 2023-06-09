import { StyleSheet } from 'react-native';

import { Metrics, Fonts, Colors } from '../../../Theme/';

const TEXT_BTN = Fonts.style.normal;
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  container: {
    paddingBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  logo: {
    height: Metrics.screenHeight * 0.22,
    width: '100%',
    alignItems: 'center',
  },
  headerLogo: {
    resizeMode: 'stretch',
    position: 'relative',
    height: Metrics.screenHeight / 7,
    width: Metrics.screenWidth / 3,
    alignSelf: 'center',
    marginBottom: Metrics.doubleBaseMargin * 2,
  },
  centered: {
    alignItems: 'center',
  },
  headerContainer: {
    paddingTop: Metrics.doubleBaseMargin * 3,
    height: Metrics.screenHeight * 0.37,
    width: '100%',
    paddingHorizontal: 20,
  },
  header: {
    alignSelf: 'center',
    flex: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Metrics.baseMargin,
  },
  headerText: {
    color: Colors.black,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    ...Fonts.style.normal,
  },
  TextInputStyleClass: {
    textAlign: 'center',
    color: Colors.snow,
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginLeft: 20,
    marginRight: 20,
  },
  Footer: {
    marginBottom: Metrics.baseMargin * 5,
  },
  cguContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Metrics.baseMargin,
    flex: 0.8,
  },
  checkboxContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
    width: '90%',
  },
  conditionsPwd: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 40,
    marginRight: 20,
    alignItems: 'flex-start',
    marginBottom: Metrics.baseMargin,
    width: '70%',
  },
  cguText: {
    alignSelf: 'stretch',
    color: Colors.snow,
    ...Fonts.style.normal,
  },
  cguLink: {
    alignSelf: 'flex-end',
    width: '100%',
    color: '#ec008c',
    textDecorationLine: 'underline',
    ...Fonts.style.normal,
  },
  btnPressed: {
    width: '48%',
  },
  btnUnpressed: {
    width: '48%',
    backgroundColor: Colors.snow,
  },
  textStyleBtn1: {
    color: Colors.lightBlue,
    fontWeight: '400',
    ...TEXT_BTN,
  },
  textStyleBtn2: {
    fontWeight: '400',
    ...TEXT_BTN,
  },
  dateText: {
    color: Colors.snow,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: -150,
    ...Fonts.style.normal,
  },
  checkboxError: {
    color: 'red',
    backgroundColor: Colors.transparent,
    textAlign: 'left',
    marginTop: -10,
    ...Fonts.style.normal,
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
  sexError: {
    color: 'red',
    backgroundColor: Colors.transparent,
    textAlign: 'left',
    marginTop: -5,
    ...Fonts.style.normal,
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
  buttonView: {
    flex: 0.5,
    marginTop: -10,
    paddingTop: 10,
    alignItems: 'stretch',
    width: '100%',
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    marginTop: 30,
    width: '100%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 0,
  },
  cond: {
    color: Colors.main,
    paddingBottom: 10,
    marginLeft: 10,
  },
  cond2: {
    color: Colors.main,
    marginLeft: 10,
  },
  submitBtn: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    height: Metrics.button,
  },
  loginIcon: {
    paddingTop: 8,
    paddingStart: 20,
  },
  fullScreenFlex: {
    flex: 1,
  },
  linkText: {
    color: Colors.greyScaleSix,
    left: 20,
    textTransform: 'uppercase',
    ...Fonts.style.buttonText,
  },
});
