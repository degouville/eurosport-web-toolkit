import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import ActivatedComments, { ActivatedCommentsPropTypeShape } from './ActivatedComments';
import DeactivatedComments from './DeactivatedComments';

const StyledAdvertisement = styled.div`
  margin: 0 auto 30px;
  display: table;
`;

const UserComments = props => {
  const { livefyreConfig, topAdElement, deactivatedText } = props;
  const comments = livefyreConfig.areCommentsActivated ? (
    <ActivatedComments {...props} />
  ) : (
    <DeactivatedComments deactivatedText={deactivatedText} />
  );

  return (
    <>
      <StyledAdvertisement>{topAdElement}</StyledAdvertisement>
      {comments}
    </>
  );
};

UserComments.defaultProps = {
  userToken: '',
  topAdElement: null,
  rightAdElement: null,
  nbCommentsText: '{{count}} comment',
  nbCommentsTextPlural: '{{count}} comments',
  deactivatedText: 'Comments are deactivated for this publication',
  fullWidth: true,
};

UserComments.propTypes = {
  livefyreConfig: ActivatedCommentsPropTypeShape.isRequired,
  loginCallback: PropTypes.func.isRequired,
  logoutCallback: PropTypes.func.isRequired,
  userToken: PropTypes.string,
  topAdElement: PropTypes.element,
  rightAdElement: PropTypes.element,
  nbCommentsText: PropTypes.string,
  nbCommentsTextPlural: PropTypes.string,
  deactivatedText: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default UserComments;
