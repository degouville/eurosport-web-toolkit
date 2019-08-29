import React from 'react';
import ETPlayer, { ETPDefaultProps, ETPPropTypes } from '@eurosport/toolkit-player';
import PlayerSkin from './PlayerSkin';

const JWPlayerETP = props => <ETPlayer {...props} />;

JWPlayerETP.defaultProps = {
  ...ETPDefaultProps,
  PlayerControls: PlayerSkin,
};

JWPlayerETP.propTypes = ETPPropTypes;

export default JWPlayerETP;
