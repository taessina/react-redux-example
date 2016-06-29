// @flow

type StreamData = {
  collection: Array<Track>;
};

import SC from 'soundcloud';
import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';
import * as actionTypes from '../constants/actionTypes';
import { setTracks } from '../actions/track';

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user,
  };
}

function fetchStream(me, session) {
  return (dispatch: Function) => {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data: StreamData) => {
        dispatch(setTracks(data.collection));
      });
  };
}

export function auth() {
  return (dispatch: Function) => {
    SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

    SC.connect().then((session) => {
      fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
        .then((response) => response.json())
        .then((me) => {
          dispatch(setMe(me));
          dispatch(fetchStream(me, session));
        });
    });
  };
}
