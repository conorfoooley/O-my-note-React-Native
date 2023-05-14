import { put, call } from 'redux-saga/effects';

import API from 'app/Services/Api';
import AlertActions from 'app/State/AlertRedux';
import TokenActions from 'app/State/TokenRedux';
import userActions from 'app/State/UserRedux';
import { translate } from 'app/translations/translationHelpers';

import LoginGoogleActions from '../Redux/LoginGoogleRedux';
// attempts to login
const api = API.create();

function attemptsToLogingoogle({ payload }: any) {
  return new Promise((resolve, reject) => {
    api
      .authenticateWithGoogle(payload)
      .then((response) => {
        if (response.ok) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function* loginGoogleWatcher(payload: any): any {
  try {
    const response = yield call(attemptsToLogingoogle, payload);
    if (response.key) {
      yield put(LoginGoogleActions.loginGoogleSuccess(response));
      yield put(TokenActions.setToken(response.key));
      yield put(userActions.userRequest({ token: response.key }));
    } else {
      AlertActions.alertRequest({
        title: translate('googleLoginFailed'),
        description: translate('userError'),
      });
    }
  } catch (e) {
    yield put(LoginGoogleActions.loginGoogleFailure(e));
    yield put(
      AlertActions.alertRequest({
        title: translate('googleLoginFailed'),
        description: translate('"errorFailedDesc"'),
      }),
    );
  }
}
