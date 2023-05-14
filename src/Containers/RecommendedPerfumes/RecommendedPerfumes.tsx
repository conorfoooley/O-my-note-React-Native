import { RootState, AppDispatch } from 'Containers/App';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import {
  ScreenTemplate,
  PerfumeCategoryPicker,
  Panel,
  PanelFooter,
  ProgressPanelHeader,
  Loader,
} from 'app/Components';
import * as enums from 'app/Constants/enums';
import * as types from 'app/Constants/types';
import { Route } from 'app/Navigators';
import { AnalyticsService, AnalyticsEvent, CrashlyticsService } from 'app/Services';
import Api from 'app/Services/Api';
import UserActions from 'app/State/UserRedux';
import { Colors, Fonts, Metrics, Typography } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

import RecommendedPerfumeList from './RecommendedPerfumeList';

interface Props {
  perfumes: types.Perfume[];
  notes: types.Note[];
  suggestionId: number;
  token: string;
  user: types.User;
  navigation: types.NavigationProp<Route.Perfumes, types.NavigationParams[Route.Perfumes]>;
  updateUser: (user: types.User) => void;
}

interface State {
  perfumes: types.Perfume[];
  perfumesFilter: string;
  loading: boolean;
}

class RecommendedPerfumes extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      perfumes: [],
      perfumesFilter: 'all',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ perfumes: this.props?.perfumes });
    console.log(this.props.perfumes);
    AnalyticsService.logEvent(AnalyticsEvent.UserGetPerfumesRecommendation);
  }

  
  perfumesByType = async (categories: string[]) => {
    this.setState({ loading: true, perfumes: [] });
    const { notes, suggestionId, token } = this.props;
        // TODO fix this error
    // @ts-ignore
    const { latitude, longitude } =
      this.props.navigation.state.params && this.props.navigation.state.params;
    try {
      const perfumes: any = await Api.create().getPerfumesByType(
        notes,
        suggestionId,
        token,
        latitude,
        longitude,
        categories,
      );
      const selectedPerfumes: types.Perfume[] = perfumes.data.matched_perfumes;
      this.setState({ loading: false, perfumes: selectedPerfumes });
    } catch (error) {
      CrashlyticsService.logError(error, 'GET_PERFUMES_BY_TYPE_ERROR');
    }
  };

  onSelect = (id: number) => {
    const { perfumes } = this.state;
    const selectedPerfume = perfumes?.find((el: any) => el.pk === id);
    this.props.navigation.navigate(Route.PerfumeDetails, { selectedPerfume });
  };

  updateCollection = async (type: any, id: number) => {
    await Api.create().updateCollection(type, id, this.props.token);
    const newUser = (await Api.create().getUser(this.props.token)) as any;
    this.props.updateUser(newUser.data);
  };

  handlePress = async (categories: string[]) => {
    await this.perfumesByType(categories);
  };

  handlePressLeftButton = () => this.props.navigation.goBack();

  handlePressExit = () => this.props.navigation.navigate(Route.Dashboard);

  handlePressRightButton = () => this.props.navigation.navigate(Route.SaveRecipe);

  render() {
    const { navigation } = this.props;
    const isFromPersonalizedRecipe = navigation.getParam('isFromPersonalizedRecipe');
    const { perfumes, loading } = this.state;

    return (
      <>
        <ScreenTemplate
          headerBlueProps={{
            title: translate('recommendations'),
          }}
          containerStyle={styles.screenTemplateBackgroundColor}
          statusBarType="light-content"
        >
          <Panel>
            <ProgressPanelHeader
              progress={enums.ProgressPanelHeaderStep.Recommendation}
              perfumeCategoryPicker={<PerfumeCategoryPicker onPress={this.perfumesByType} />}
              style={styles.progressPanelHeader}
            />

            {loading ? (
              <Loader />
            ) : perfumes.length > 0 ? (
              <RecommendedPerfumeList
                user={this.props.user}
                perfumes={perfumes}
                onSelect={this.onSelect}
                updateCollection={this.updateCollection}
              />
            ) : (
              <Text style={styles.header}>{translate('notFound')}</Text>
            )}
          </Panel>
        </ScreenTemplate>
        <PanelFooter
          style={styles.panelFooter}
          back
          onPressExit={this.handlePressExit}
          onPressLeftButton={this.handlePressLeftButton}
          leftButtonAsSecondary={isFromPersonalizedRecipe}
          onPressRightButton={isFromPersonalizedRecipe ? undefined : this.handlePressRightButton}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  progressPanelHeader: { backgroundColor: Colors.backgroundSecondary },
  header: {
    ...Fonts.style.h3,
    color: Colors.greyScaleSix,
    lineHeight: Typography.lineHeight,
    height: Metrics.perfumeSmallCardHeight / 2,
    marginTop: Metrics.mediumMargin,
    marginStart: Metrics.mediumMargin,
  },
  panelFooter: { bottom: -2 },
});

const mapStateToProps = (state: RootState) => ({
  perfumes: state.user.perfumes,
  notes: state.user.notes.resultat,
  suggestionId: state.user.notes.id || state?.user.notes?.suggestionId,
  user: state.user.user,
  token: state.token.token,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateUser: (data: any) => {
    dispatch(UserActions.userSuccess(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedPerfumes as any);
