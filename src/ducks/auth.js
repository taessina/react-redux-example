// @flow

type Action = {
  type: string;
  user: Object;
};

type StreamData = {
  collection: Array<Track>;
};

import SC from 'soundcloud';
import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';
import { actionCreators as trackActionCreators } from './track';

const ME_SET = 'auth/ME_SET';

function doSetMe(user) {
  return {
    type: ME_SET,
    user,
  };
}

function doFetchStream(me, session) {
  return (dispatch: Function) => {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data: StreamData) => {
        dispatch(trackActionCreators.doSetTracks(data.collection));
      });
  };
}

export function doAuth() {
  return (dispatch: Function) => {
    SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

    SC.connect().then((session) => {
      fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
        .then((response) => response.json())
        .then((me) => {
          dispatch(doSetMe(me));
          dispatch(doFetchStream(me, session));
        });
    });
  };
}

const initialState = {};

function applySetMe(state, action) {
  const { user } = action;
  return { ...state, user };
}

function reducer(state: Object = initialState, action: Action): Object {
  switch (action.type) {
    case ME_SET:
      return applySetMe(state, action);
    default:
      return state;
  }
}

const actionCreators = {
  doAuth,
};

const actionTypes = {
  ME_SET,
};

export {
  actionCreators,
  actionTypes,
};

export default reducer;
