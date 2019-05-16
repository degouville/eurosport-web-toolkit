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
  const { livefyreConfig, topAdElement } = props;
  const comments = livefyreConfig.areCommentsActivated ? <ActivatedComments {...props} /> : <DeactivatedComments />;

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
};

UserComments.propTypes = {
  livefyreConfig: ActivatedCommentsPropTypeShape.isRequired,
  loginCallback: PropTypes.func.isRequired,
  logoutCallback: PropTypes.func.isRequired,
  userToken: PropTypes.string,
  topAdElement: PropTypes.element,
  rightAdElement: PropTypes.element,
};

export default UserComments;
