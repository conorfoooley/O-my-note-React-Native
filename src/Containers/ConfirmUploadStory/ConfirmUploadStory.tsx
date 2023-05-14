import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { ScreenTemplate, Panel, VideoRecordDescription, Footer } from 'app/Components';
import VideoPlayer from 'app/Components/VideoPlayer/VideoPlayer';
import * as types from 'app/Constants/types';
import { AppDispatch, RootState } from 'app/Containers/App';
import { Route } from 'app/Navigators';
import UploadStoryActions from 'app/State/UploadStoryRedux';
import { Colors, Metrics } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

interface Props {
  navigation: types.NavigationProp<
    Route.ConfirmUploadStory,
    types.NavigationParams[Route.ConfirmUploadStory]
  >;
  token: string;
  user: types.User;
  fetching: boolean;
  uploadStory: (story: any, token: string, videoURL: string, callback: (res: any) => void) => void;
}

interface State {
  loading: boolean;
}

class ConfirmUploadStory extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.fetching !== prevState.loading) {
      return { loading: nextProps.fetching };
    }
    return null;
  }

  navigateNoteSelection = () => {
    const { videoPath, videoType, video, language } = this.props.navigation.state.params as any;
    this.props.navigation.navigate(Route.NoteSelection, { videoPath, videoType, video, language });
  };

  render() {
    const { videoPath, videoType, textStory } = this.props.navigation.state.params as any;
    const { loading } = this.state;
    const { navigation } = this.props;

    return (
      <ScreenTemplate
        headerBlueProps={{
          title: loading ? translate('findPersonalizedRecipe') : translate('storyTime'),
        }}
        noScroll
        containerStyle={styles.screenTemplateBackgroundColor}
        contentContainerStyle={styles.container}
        statusBarType="light-content"
      >
        <Panel style={styles.panel}>
          {videoPath && videoType !== 'audio' && <VideoPlayer video={videoPath} />}
          {(videoPath || textStory) && (
            <>
              <VideoRecordDescription style={styles.descriptionContainer} />
              <View style={styles.footerContainer}>
                <Footer upload navigation={navigation} onPressRightIcon={this.navigateNoteSelection} />
              </View>
            </>
          )}
        </Panel>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  panel: { borderWidth: 0 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.navyBlue },
  descriptionContainer: {
    position: 'absolute',
    top: Metrics.smallerMargin,
    left: Metrics.smallerMargin,
    right: Metrics.smallerMargin,
  },
  footerContainer: {
    bottom: Metrics.videoRecordCameraBottom,
    position: 'absolute',
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  token: state.token.token,
  fetching: state.uploadStory.fetching,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  uploadStory: (story: any, token: any, videoURL: any, callback: any) =>
    dispatch(
      UploadStoryActions.uploadStoryRequest({
        story,
        token,
        videoURL,
        callback,
      }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUploadStory as any);
