import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { rgba } from 'polished';
import Check from 'src/assets/red-check.svg';
import Button from '../../elements/Button';
import * as breakpoints from '../../breakpoints';
import * as colors from '../../colors';
import { H2, fontAlphaHeadline, fontHelvetica } from '../../typography';

const StyledWrapper = styled.div`
  position: relative;
  ${props =>
    props.pictureUrl &&
    css`
      background: url(${props.pictureUrl}) ${colors.blackPearl} top right;
      background-size: cover;
    `};
  color: ${colors.white};
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
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
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
      <StyledList data-test="promotion-list">
        {texts.map((text, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledItem key={i}>{text}</StyledItem>
        ))}
      </StyledList>
      {linkButton && textButton && (
        <StyledButton data-test="promotion-link" href={linkButton} type="primary">
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
  className: undefined,
};

export default PlayerPromotionBox;
