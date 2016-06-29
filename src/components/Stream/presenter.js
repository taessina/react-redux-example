// @flow

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

class Stream extends React.Component {
  static props: {
    user: User,
    tracks: Array<Track>,
    activeTrack: ?Track,
    onAuth: () => void,
    onPlay: (someTrack: Track) => void,
  };

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { activeTrack } = this.props;

    if (activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    const { user, tracks = [], activeTrack, onAuth, onPlay } = this.props;

    return (
      <div>
        <div>
          {
            user ?
              <div>{user.username}</div>
            :
              <button onClick={onAuth} type="button">Login</button>
          }
        </div>
        <br />
        <div>
          {
            tracks.map((track, key) => (
              <div className="track" key={key}>
                {track.origin.title}
                <button type="button" onClick={() => onPlay(track)}>Play</button>
              </div>
            ))
          }
        </div>
        {
          activeTrack ?
            <audio
              id="audio"
              ref="audio"
              src={`${activeTrack.origin.stream_url}?client_id=${CLIENT_ID}`}
            >
            </audio>
          :
          null
        }
      </div>
    );
  }
}

Stream.propTypes = {
  activeTrack: PropTypes.object,
  user: PropTypes.object,
  tracks: PropTypes.array,
  onAuth: PropTypes.func,
  onPlay: PropTypes.func,
};

export default Stream;
