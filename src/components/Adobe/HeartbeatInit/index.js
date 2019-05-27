import { Component } from 'react';
import PropTypes from 'prop-types';

class HeartbeatInit extends Component {
  componentDidMount() {
    const { eventLoadedName } = this.props;
    window.addEventListener(eventLoadedName, this.initialiseHeartbeat);
  }

  componentWillUnmount() {
    const { eventLoadedName } = this.props;
    window.removeEventListener(eventLoadedName, this.initialiseHeartbeat);
  }

  initialiseHeartbeat = () => {
    const { callback } = this.props;
    callback && callback();
  };

  render() {
    return null;
  }
}

HeartbeatInit.defaultProps = {
  eventLoadedName: 'heartbeat-loaded',
  callback: null,
};

HeartbeatInit.propTypes = {
  eventLoadedName: PropTypes.string,
  callback: PropTypes.func,
};

export default HeartbeatInit;
