import React from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { Input, Panel, PanelFooter, ScreenTemplate } from 'app/Components';
import * as types from 'app/Constants/types';
import { RootState } from 'app/Containers/App';
import { validateNom } from 'app/Containers/Login/Validation';
import { Route } from 'app/Navigators';
import NotesSelectionActions from 'app/State/NotesSelectionRedux';
import { Colors, Fonts, Metrics, Typography } from 'app/Theme';
import { translate } from 'app/translations/translationHelpers';

interface Props {
  fetching: boolean;
  token: string;
  suggestionId: number;
  updateNotes: ({ ...args }: types.UpdateNotesPayload) => void;
  navigation: types.NavigationProp<Route.SaveRecipe, types.NavigationParams[Route.SaveRecipe]>;
}

interface State {
  name: string;
  errorName: string;
  height: number;
}

export class SaveRecipe extends React.PureComponent<Props, State> {
  name: any;

  state = {
    name: '',
    errorName: '',
    height:0,
  };

  handleChangeText = (name: string) => this.setState({ name });

  handlePressLeftButton = () => this.props.navigation.goBack();

  handlePressExit = () => this.props.navigation.navigate(Route.Dashboard);

  handlePressRightButton = async () => {
    if (!validateNom(this.state.name.trim())) {
      this.setState({
        errorName: 'Invalid name',
      });
    } else {
      this.setState({
        errorName: '',
      });
      const { token, suggestionId, updateNotes } = this.props;
      const { name } = this.state;
      updateNotes({
        id: suggestionId,
        token,
        recipe_name: name,
        saved_recipe: true,
        redirectTo: Route.Dashboard,
      });
    }
  };

  render() {
    const { fetching } = this.props;
    const { name, errorName } = this.state;
    return (
      <>
        <ScreenTemplate
          headerBlueProps={{
            title: translate('savePersonalizedRecipe'),
          }}
          containerStyle={styles.screenTemplateBackgroundColor}
          statusBarType="light-content"
        >
          <Panel isLoading={fetching}>
            <View style={styles.container}>
              <Text style={styles.header}>{translate('savePersonalizedRecipeName')}</Text>
              <Input
                numberOfLines={6}
                multiline
                ref={(c: any) => {
                  this.name = c;
                }}
                inputContainerStyle={styles.input}
                textStyle={styles.inputText}
                label={translate('recipeName')}
                autoCorrect={false}
                errorText={errorName}
                value={name}
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={(name: string) => this.setState({ name })}
              />
            </View>
          </Panel>
        </ScreenTemplate>
        <PanelFooter
          style={styles.panelFooter}
          back
          onPressExit={this.handlePressExit}
          onPressLeftButton={this.handlePressLeftButton}
          onPressRightButton={this.handlePressRightButton}
        />
      </>
    );
  }
}
const styles = StyleSheet.create({
  screenTemplateBackgroundColor: { backgroundColor: Colors.navyBlue },
  container: {
    flex: 1,
    paddingHorizontal: Metrics.mediumMargin,
    paddingTop: Metrics.mediumMargin,
  },
  header: {
    ...Fonts.style.h3,
    color: Colors.greyScaleSix,
    lineHeight: Typography.lineHeight,
  },
  input: { height: 70 },
  inputText: { textAlignVertical: 'top' },
  panelFooter: { bottom: -2 },
});

const mapStateToProps = (state: RootState) => ({
  suggestionId: state?.user?.notes?.suggestionId,
  token: state.token.token,
  fetching: state.updateNotes.fetching,
});
const mapDispatchToProps = {
  updateNotes: NotesSelectionActions.notesSelectionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveRecipe);
