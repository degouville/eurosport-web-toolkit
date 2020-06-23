import React from 'react';
import styled, { css } from 'react-emotion';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import Play from 'src/assets/circleplay.component.svg';
import Carousel from '../../components/Carousel';
import Cards from '../../components/Card';
import { white, iron } from '../../colors';

const StyledPlayIco = styled(Play)`
  width: 16px;
  height: 16px;
  display: block;
  margin-bottom: 8px;
`;

const StyledTitle = styled.div`
  float: left;
  text-transform: uppercase;
  font-size: 11px;
  line-height: 14px;
  color: ${iron};
  width: 100px;
  user-select: none;
  display: none;

  @media (min-width: 900px) {
    font-size: 12px;
    display: block;
    margin-right: 16px;
  }

  ${({ isCarouselCard }) =>
    isCarouselCard &&
    css`
    display: block;
    white-space: normal;
    @media (min-width: 900px) {
        display: none;
        margin-right: inherit;
    }
  }
  `}
`;

const StyledTitleContent = styled.div`
  height: 76px;
  display: table-cell;
  vertical-align: middle;
  @media (min-width: 900px) {
    height: 88px;
  }
`;

const StyledTitleText = styled.div`
  padding-bottom: 6px;
  border-bottom: 1px solid ${rgba(white, 0.3)};
`;

const generateTitle = (title, isCarouselCard = false) => (
  <StyledTitle key={title} isCarouselCard={isCarouselCard}>
    <StyledTitleContent>
      <StyledPlayIco />
      <StyledTitleText>{title}</StyledTitleText>
    </StyledTitleContent>
  </StyledTitle>
);

const generateChildren = (cards, title) => {
  const children = [];
  if (title) {
    children.push(generateTitle(title, true));
  }
  cards.forEach((card, index) => {
    children.push(
      <Cards.Watchbar key={card.title + card.startTime + card.endTime} card={card} trackingPosition={index} />
    );
  });
  return children;
};

const WatchBar = ({ cards, title }) => {
  if (!cards.length) return null;

  const watchBarCarouselCards = generateChildren(cards, title);
  const watchBarTitle = title && generateTitle(title);

  return (
    <div>
      {watchBarTitle}
      <Carousel>{watchBarCarouselCards}</Carousel>
    </div>
  );
};

WatchBar.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
};

WatchBar.defaultProps = {
  title: null,
};

export default WatchBar;
