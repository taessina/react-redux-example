// @flow

type State = {
  tracks: Array<Object>;
  activeTrack: ?Object;
};

type SetTracksAction = {
  type: string;
  tracks: Array<Track>;
}

type PlayTrackAction = {
  type: string;
  track: Track;
};

type Action = SetTracksAction | PlayTrackAction;

const TRACKS_SET: string = 'track/TRACKS_SET';
const TRACK_PLAY: string = 'track/TRACK_PLAY';

function doSetTracks(tracks: Array<Track>): Action {
  return {
    type: TRACKS_SET,
    tracks,
  };
}

function doPlayTrack(track: Track): Action {
  return {
    type: TRACK_PLAY,
    track,
  };
}

const initialState = {
  tracks: [],
  activeTrack: null,
};

function applySetTracks(state, action) {
  const { tracks } = action;
  return { ...state, tracks };
}

function applySetPlay(state, action) {
  const { track } = action;
  return { ...state, activeTrack: track };
}

function reducer(state: State = initialState, action: Object): State {
  switch (action.type) {
    case TRACKS_SET:
      return applySetTracks(state, action);
    case TRACK_PLAY:
      return applySetPlay(state, action);
    default:
      return state;
  }
}
const actionCreators = {
  doSetTracks,
  doPlayTrack,
};

const actionTypes = {
  TRACKS_SET,
  TRACK_PLAY,
};

export {
  actionCreators,
  actionTypes,
};

export default reducer;
