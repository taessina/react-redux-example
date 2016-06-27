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
  return (dispatch) => {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTracks(data.collection));
      });
  };
}

export function auth() {
  return (dispatch) => {
    SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI }); // eslint-disable-line

    SC.connect().then((session) => { // eslint-disable-line
      fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
        .then((response) => response.json())
        .then((me) => {
          dispatch(setMe(me));
          dispatch(fetchStream(me, session));
        });
    });
  };
}
