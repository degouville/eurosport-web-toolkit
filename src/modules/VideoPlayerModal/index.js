import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import * as breakpoints from 'src/breakpoints';

const VideoPlayerModal = ({ children }) => (
  <MainContainer>
    <ChildContainer>{children}</ChildContainer>
  </MainContainer>
);

VideoPlayerModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ChildContainer = styled.div`
  width: 100%;
  margin: 20px;

  ${breakpoints.large(`
     width: 418px;
     margin: 0;
  `)};
`;

export default VideoPlayerModal;
