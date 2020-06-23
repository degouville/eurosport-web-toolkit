import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import * as breakpoints from '../../breakpoints';
import * as colors from '../../colors';
import { Row, Column } from '../../elements/Grid';
import Author from '../../components/Author';
import { H1 } from '../../typography';

const StyledWrapper = styled.header`
  position: relative;
  background-color: ${colors.blackPearl};
  clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 30px), 0% 100%);
  height: 445px;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(transparent 30%, ${colors.ebony} 90%, ${colors.ebony});
    z-index: 1;
    opacity: 0.4;
  }

  ${breakpoints.small(css`
    height: 475px;
    clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 35px), 0% 100%);
  `)};
  ${breakpoints.wide(css`
    height: 630px;
    clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 50px), 0% 100%);
  `)};
`;

const StyledImage = styled.div`
  position: relative;
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  background-position: 50% 0;
  opacity: 0.65;
  height: 100%;
`;

const StyledRow = styled(Row)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  align-items: flex-end;
  justify-content: center;
  z-index: 2;
  display: flex;
  ${breakpoints.small(css`
    justify-content: flex-start;
  `)};
`;

const StyledTitle = styled(H1)`
  color: ${colors.white};
  word-break: break-word;
  margin-bottom: 32px;
  ${breakpoints.medium(css`
    margin-bottom: 23px;
  `)};
`;

const StyledAuthor = styled(Author)`
  margin-bottom: 57px;

  ${breakpoints.medium(css`
    margin-bottom: 80px;
  `)};
  ${breakpoints.wide(css`
    margin-bottom: 108px;
  `)};
`;

const Hero = ({ title, img, author, time, ...props }) => (
  <StyledWrapper {...props}>
    <StyledImage img={img} />
    <StyledRow>
      <Column mediumOffset="1" medium="9" wide="7">
        <StyledTitle>{title}</StyledTitle>
        <StyledAuthor {...author} time={time} />
      </Column>
    </StyledRow>
  </StyledWrapper>
);

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string,
    img: PropTypes.string,
  }),
  time: PropTypes.string,
};

Hero.defaultProps = {
  author: null,
  time: '',
};

Hero.displayName = 'Hero';

export default Hero;
