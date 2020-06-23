import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import * as breakpoints from 'src/breakpoints';
import CloseIcon from '../../assets/close-cross.component.svg';
import ESPlayerBG from '../../assets/backgrounds/eurosport-player';
import { responsiveRetinaImage } from '../../images';

const VideoPlayerModal = ({ children, onClose }) => (
  <MainContainer>
    <StyledScrollable>
      <StyledCloseIcon onClick={onClose} />
      <ChildContainer>{children}</ChildContainer>
    </StyledScrollable>
  </MainContainer>
);

VideoPlayerModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 20px;
  cursor: pointer;
  ${breakpoints.small(css`
    top: 34px;
    right: 27px;
  `)};
  ${breakpoints.medium(css`
    top: 67px;
    right: 38px;
  `)};
  ${breakpoints.large(css`
    top: 43px;
    right: 38px;
  `)};

  path {
    fill: ${({ theme }) => theme.videoPlayerModal.closeIcon.fill};
  }
`;

const StyledScrollable = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const MainContainer = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${({ theme }) => theme.loginWithMarketing.mobileBackground};
  ${responsiveRetinaImage(ESPlayerBG)};
  background-position-x: center;
  background-position-y: 20%;
  background-size: cover;
  background-repeat: no-repeat;
  ${breakpoints.medium(css`
    align-items: flex-start;
    background-position-y: 0;
  `)};
  ${breakpoints.large(css`
    background-position-y: 26%;
    align-items: center;
  `)};
`;

export const ChildContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default VideoPlayerModal;
