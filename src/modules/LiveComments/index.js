import React from 'react';
import PropTypes from 'prop-types';
import LiveComment, { LiveCommentPropTypeShape } from './LiveComment';

const LiveComments = ({ livecomments, labelPlayButton }) =>
  livecomments.map(comment => <LiveComment key={comment.id} liveComment={comment} labelPlayButton={labelPlayButton} />);

LiveComments.propTypes = {
  livecomments: PropTypes.arrayOf(LiveCommentPropTypeShape).isRequired,
  labelPlayButton: PropTypes.string.isRequired,
};

export default LiveComments;
