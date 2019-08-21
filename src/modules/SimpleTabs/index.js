import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import { fontAlphaHeadline } from '../../typography';
import * as breakpoints from '../../breakpoints';
import Carousel, { StyledSlide } from '../../components/Carousel';
import Link from '../../elements/Link';

const StyledCarousel = styled(Carousel)`
  justify-content: flex-start;
  font-size: 12px;
  line-height: 22px;
  margin: 0 0 16px 0;
  ${fontAlphaHeadline};

  ${breakpoints.medium(css`
    font-size: 16px;
  `)}
`;

export const TabCommonStyle = ({ tab }) => css`
  display: block;
  margin-right: 12px;
  position: relative;
  opacity: 0.5;
  color: ${tab.active.color};
  ${breakpoints.medium(css`
    padding-bottom: 5px;
    margin-right: 32px;
  `)}

  &:after {
    content: '|';
    position: absolute;
    right: -13px;
    color: ${tab.separator};

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
  ${({ theme }) => TabCommonStyle(theme)};
  cursor: pointer;
  text-decoration: none;
  opacity: ${props => (props['data-highlighted'] ? '1' : '.5')};
`;
export const TabInactive = styled.span`
  ${({ theme }) => TabCommonStyle(theme)};
  cursor: not-allowed;
`;
export const TabSelected = styled.span`
  ${({ theme }) => TabCommonStyle(theme)};
  cursor: pointer;
  opacity: 1;
  color: ${props => (props['data-highlighted'] ? props.theme.tab.active.color : props.theme.tab.borderColor)};
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.tab.active.borderColor};
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
        highlighted: PropTypes.boolean,
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
        {tabs.map(({ label, disabled, highlighted, href }, i) => {
          if (currentTab === i)
            return (
              <TabSelected key={`${label}${href}`} data-highlighted={highlighted}>
                {label}
              </TabSelected>
            );
          if (disabled) return <TabInactive key={`${label}${href}`}>{label}</TabInactive>;
          return (
            <TabActive
              key={`${label}${href}`}
              data-highlighted={highlighted}
              onClick={e => this.handleClick(e, href, i)}
              href={href}
            >
              {label}
            </TabActive>
          );
        })}
      </StyledCarousel>
    );
  }
}
