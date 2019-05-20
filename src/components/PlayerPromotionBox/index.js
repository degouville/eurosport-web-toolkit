import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { rgba } from 'polished';
import Button from '../../elements/Button';
import * as breakpoints from '../../breakpoints';
import * as colors from '../../colors';
import { H2, fontAlphaHeadline, fontHelvetica } from '../../typography';
import Check from '../../assets/red-check.svg';

const StyledWrapper = styled.div`
  position: relative;
  ${props =>
    props.pictureUrl &&
    css`
      background: url(${props.pictureUrl}) ${colors.brandPlus2} top right;
      background-size: cover;
    `};
  color: ${colors.coreLightMinus1};
  padding: 40px 20px 45px;
  ${breakpoints.medium(css`
    padding: 54px 34px 86px;
  `)};
  ${breakpoints.medium(css`
    padding: 34px;
  `)};
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(270deg, ${rgba(colors.blueZodiac, 0)} 0%, ${colors.blueZodiac} 100%);
    z-index: 0;
  }
`;

const StyledSubContainer = styled.div`
  max-width: 213px;
  ${breakpoints.large(css`
    max-width: 70%;
  `)};
  position: relative;
  z-index: 1;
`;

const StyledTitle = styled(H2)`
  margin-bottom: 30px;
  color: ${colors.athensGray};
  ${fontAlphaHeadline};
`;

const StyledList = styled.ul`
  margin-bottom: 20px;
`;

export const StyledItem = styled.li`
  background: url(${Check}) no-repeat;
  line-height: 19px;
  background-size: 24px 19px;
  padding-left: 35px;
  margin-bottom: 23px;
  ${fontHelvetica};
  font-size: 14px;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  font-size: 11px;
  width: 213px;
`;

const PlayerPromotionBox = ({ className, pictureUrl, title, texts, textButton, linkButton }) => (
  <StyledWrapper className={className} pictureUrl={pictureUrl}>
    <StyledSubContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledList>
        {texts.map((text, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledItem key={i}>{text}</StyledItem>
        ))}
      </StyledList>
      {linkButton && textButton && (
        <StyledButton href={linkButton} type="primary">
          {textButton}
        </StyledButton>
      )}
    </StyledSubContainer>
  </StyledWrapper>
);

PlayerPromotionBox.propTypes = {
  pictureUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  textButton: PropTypes.string,
  linkButton: PropTypes.string,
  className: PropTypes.string,
};

PlayerPromotionBox.defaultProps = {
  pictureUrl: null,
  textButton: null,
  linkButton: null,
  className: '',
};

export default PlayerPromotionBox;
