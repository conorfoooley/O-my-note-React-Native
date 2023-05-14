import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  Panel,
  PerfumeCardAccuracyMatch,
  PerfumeDetailsHeart,
  ScreenTemplate,
  NoteCard,
  Image,
} from 'app/Components';
import { Route } from 'app/Navigators';
import UserActions from 'app/State/UserRedux';
import { translate } from 'app/translations/translationHelpers';

import AffiliateLink from '../../Components/AffiliateLink/AffiliateLink';
import * as types from '../../Constants/types';
import Api from '../../Services/Api';
import { Fonts, Metrics, Colors, Typography } from '../../Theme';
import { AppDispatch, RootState } from '../App';

interface Props {
  navigation: types.NavigationProp<Route.PerfumeDetails, types.NavigationParams[Route.PerfumeDetails]>;
  perfumes: types.Perfume[];
  token: string;
  user: types.User;
  updateUser: (data: any) => void;
}

interface State {
  perfume: types.Perfume;
  inMyPerfumes: boolean;
}

class PerfumeDetails extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const selectedPerfume: types.Perfume = this.props.navigation.getParam('selectedPerfume');
    const test = this.props?.user?.wish_perfumes?.find((e: { pk: number }) => e.pk === selectedPerfume.pk);
    this.state = {
      perfume: selectedPerfume,
      inMyPerfumes: !!test,
    };
  }

  setMyCollection = async (mode: 'remove' | 'add') => {
    await Api.create().updateCollection(mode, this.state.perfume.pk, this.props.token);
    const newUser: any = await Api.create().getUser(this.props.token);
    this.props.updateUser(newUser.data);
    this.setState({ inMyPerfumes: !this.state.inMyPerfumes });
  };

  render() {
    const { name, image, notes, affiliate_links, brand, designer, release_year, fetch_accuracy, gender } =
      this.state.perfume;
    return (
      <ScreenTemplate
        containerStyle={styles.container}
        safeAreaEdges={['top']}
        headerProps={{
          showLeftIcon: true,
          leftIconName: 'chevron-left',
          showRightIcon: false,
          onPressLeftIcon: () => this.props.navigation.goBack(),
          style: styles.header,
        }}
      >
        <Image
          style={styles.image}
          resizeMode="contain"
          source={image ? { uri: image } : require('../../Assets/Images/perfume.png')}
        />
        <Panel style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <View style={styles.topTitleContainer}>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.brandText}>
                {brand}, {gender}
              </Text>
            </View>

            <View style={styles.narrowRow}>
              {fetch_accuracy && (
                <PerfumeCardAccuracyMatch style={styles.perfumeCardAccuracyMatch} match={fetch_accuracy} />
              )}
              <PerfumeDetailsHeart onPress={this.setMyCollection} isFavorite={this.state.inMyPerfumes} />
            </View>
          </View>
          {!!designer && designer !== 'n/a' && (
            <View style={styles.row}>
              <Text style={styles.mutedText}>{translate('designer')}</Text>
              <Text style={styles.text}>{designer}</Text>
            </View>
          )}
          {!!release_year && release_year !== 'n/a' && (
            <View style={styles.row}>
              <Text style={styles.mutedText}>{translate('yearOfRelease')}</Text>
              <Text style={styles.text}>{release_year}</Text>
            </View>
          )}
          <View style={[styles.divider, !(!!designer || !!release_year) && styles.marginTopZero]} />
          <Text style={styles.sectionText}>{translate('ingredients')}</Text>
          <View style={styles.detailsContainer}>
            {notes?.map((note: types.Note) => (
              <NoteCard key={note.name} note={note} disabled />
            ))}
          </View>
          <Text style={styles.sectionText}>{translate('whereToBuy')}</Text>
          <AffiliateLink affiliateLinks={affiliate_links} />
        </Panel>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyScaleOne,
  },
  contentContainer: {
    paddingHorizontal: Metrics.mediumMargin,
    paddingBottom: 32,
  },
  topTitleContainer: { flexDirection: 'column', width: '75%' },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Metrics.smallMargin - 1,
    marginBottom: 9,
  },
  image: {
    width: Metrics.screenWidth,
    aspectRatio: 342 / 398,
    marginBottom: 32,
  },
  nameText: {
    ...Fonts.style.perfumeName,
    color: Colors.blackish,
    lineHeight: Typography.xlargeLineHeight,
    marginBottom: Metrics.tinyMargin,
  },
  brandText: {
    ...Fonts.style.smallMedium,
    color: Colors.greyScaleSix,
    lineHeight: Typography.smallerLineHeight,
    marginBottom: 15,
  },
  mutedText: {
    ...Fonts.style.helper,
    color: Colors.greyScaleFive,
    lineHeight: Typography.smallLineHeight,
  },
  text: {
    ...Fonts.style.helper,
    color: Colors.greyScaleSix,
    lineHeight: Typography.smallLineHeight,
  },
  sectionText: {
    ...Fonts.style.smallMedium,
    color: Colors.greyScaleSix,
    lineHeight: Typography.smallerLineHeight,
    marginBottom: 18,
  },
  divider: {
    backgroundColor: Colors.greyScaleTwo,
    height: 1,
    marginTop: 19,
    marginBottom: Metrics.mediumMargin,
  },
  perfumeCardAccuracyMatch: { position: 'relative', top: 0, left: 0, marginRight: Metrics.margin },
  header: {
    backgroundColor: Colors.greyScaleOne,
  },
  textContainer: {
    paddingTop: Metrics.largeMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  narrowRow: {
    paddingTop: Metrics.smallerMargin,
    flexDirection: 'row',
  },
  marginTopZero: { marginTop: 0 },
});

const mapStateToProps = (state: RootState) => ({
  perfumes: state.user.perfumes,
  token: state.token.token,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateUser: (data: any) => {
    dispatch(UserActions.userSuccess(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PerfumeDetails);
