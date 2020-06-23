import React from 'react';
import PropTypes from 'prop-types';
import LiveComment, { LiveCommentPropTypeShape } from './LiveComment';

const LiveComments = ({ livecomments, labelPlayButton, className }) =>
  livecomments.map(comment => (
    <LiveComment className={className} key={comment.id} liveComment={comment} labelPlayButton={labelPlayButton} />
  ));

LiveComments.propTypes = {
  livecomments: PropTypes.arrayOf(LiveCommentPropTypeShape).isRequired,
  labelPlayButton: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default LiveComments;
