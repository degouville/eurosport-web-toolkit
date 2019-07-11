import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import { coreLightMinus1, coreNeutral4, gunPowder } from '../../colors';
import { fontAlphaHeadline } from '../../typography';
import * as breakpoints from '../../breakpoints';
import Carousel, { StyledSlide } from '../../components/Carousel';
import Link from '../../elements/Link';

const StyledCarousel = styled(Carousel)`
  justify-content: flex-start;
  font-size: 12px;
  line-height: 22px;
  ${fontAlphaHeadline};

  ${breakpoints.medium(css`
    font-size: 16px;
  `)}
`;

export const TabCommonStyle = css`
  display: block;
  margin-right: 12px;
  position: relative;
  color: ${coreLightMinus1};
  padding-bottom: 2px;

  ${breakpoints.medium(css`
    padding-bottom: 11px;
    margin-right: 32px;
  `)}

  &:after {
    content: '|';
    position: absolute;
    right: -13px;
    color: ${gunPowder};

    ${breakpoints.medium(css`
      right: -23px;
    `)}

    ${StyledSlide}:last-child & {
      display: none;
    }
  }
`;
const activeAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;
export const TabActive = styled(Link)`
  ${TabCommonStyle};
  cursor: pointer;
  text-decoration: none;
`;
export const TabInactive = styled.span`
  ${TabCommonStyle};
  color: ${coreNeutral4};
`;
export const TabSelected = styled.span`
  ${TabCommonStyle};
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 1px;
    background-color: ${coreLightMinus1};
    animation: ${activeAnimation} 0.3s;

    ${breakpoints.medium(css`
      height: 2px;
    `)}
  }
`;

export default class SimpleTabs extends React.Component {
  state = {
    selectedTabIndex: null,
  };

  static defaultProps = {
    initialTabIndex: 0,
    className: null,
  };

  static propTypes = {
    initialTabIndex: PropTypes.number,
    onItemSelected: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        disabled: PropTypes.boolean,
        href: PropTypes.string,
      })
    ).isRequired,
    className: PropTypes.string,
  };

  componentDidMount() {
    const { onItemSelected, initialTabIndex, tabs } = this.props;
    const initialTabData = tabs[initialTabIndex];
    initialTabData && onItemSelected(initialTabData.href, initialTabIndex);
  }

  handleClick(e, href, tabIndex) {
    e && e.preventDefault();
    const { onItemSelected } = this.props;

    onItemSelected(href, tabIndex);
    this.setState({ selectedTabIndex: tabIndex });
  }

  render() {
    const { tabs, initialTabIndex, className } = this.props;
    const { selectedTabIndex } = this.state;
    const currentTab = selectedTabIndex || initialTabIndex;

    return (
      <StyledCarousel withArrow={false} className={className}>
        {tabs.map(({ label, disabled, href }, i) => {
          if (currentTab === i) return <TabSelected key={`${label}${href}`}>{label}</TabSelected>;
          if (disabled) return <TabInactive key={`${label}${href}`}>{label}</TabInactive>;
          return (
            <TabActive key={`${label}${href}`} onClick={e => this.handleClick(e, href, i)} href={href}>
              {label}
            </TabActive>
          );
        })}
      </StyledCarousel>
    );
  }
}
