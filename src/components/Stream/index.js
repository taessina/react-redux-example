import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as authActionCreators } from '../../ducks/auth';
import { actionCreators as trackActionCreators } from '../../ducks/track';
import Stream from './presenter';

function mapStateToProps(state) {
  const { user } = state.auth;
  const { tracks, activeTrack } = state.track;
  return {
    user,
    tracks,
    activeTrack,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(authActionCreators.doAuth, dispatch),
    onPlay: bindActionCreators(trackActionCreators.doPlayTrack, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
