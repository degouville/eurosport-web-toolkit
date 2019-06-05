import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import E from 'src/assets/channels/E.svg';
import * as breakpoints from '../../breakpoints';
import * as colors from '../../colors';

const StyledAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImage = styled.img`
  height: 32px;
  width: 32px;
  ${breakpoints.small(css`
    height: 40px;
    width: 40px;
  `)};
`;

const StyledSpacer = styled.div`
  width: 1px;
  height: 48px;
  background: ${colors.coreLightMinus1};
  opacity: 0.3;
  margin: 0 18px 0 11px;
  ${breakpoints.small(css`
    height: 64px;
    margin: 0 17px 0 13px;
  `)};
  ${breakpoints.small(css`
    height: 56px;
    margin: 0 33px 0 26px;
  `)};
`;

const StyledContent = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 24px;
  ${breakpoints.small(css`
    font-size: 16px;
  `)};
`;

const StyledName = styled.div`
  color: ${colors.coreLightMinus1};
  font-weight: bold;
`;

const StyledTime = styled.div`
  color: ${colors.coreLightMinus1};
`;

const Author = ({ name, img, time, ...props }) => {
  const avatar = img || E;
  return (
    <StyledAuthor {...props}>
      <StyledImage src={avatar} alt={name} />
      <StyledSpacer />
      <StyledContent>
        <StyledName>{name}</StyledName>
        <StyledTime>{time}</StyledTime>
      </StyledContent>
    </StyledAuthor>
  );
};

Author.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  img: PropTypes.string,
};

Author.defaultProps = {
  img: E,
};

export default Author;
