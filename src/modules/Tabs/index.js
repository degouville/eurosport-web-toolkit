import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import AllMatchesIcon from 'src/assets/tabs/all-matches.component.svg';
import MatchIcon from 'src/assets/tabs/tennis.component.svg';
import UserCommentsIcon from 'src/assets/tabs/user-comments.component.svg';
import LiveCommentsIcon from 'src/assets/tabs/live-comments.component.svg';
import { azureRadiance, coreLightMinus1, coreNeutral3 } from '../../colors';
import { fontInterUi } from '../../typography';
import Carousel from '../../components/Carousel';
import * as icons from './icon-type';
import * as breakpoints from '../../breakpoints';

const iconsMap = {
  [icons.ALL_MATCHES]: AllMatchesIcon,
  [icons.MATCH]: MatchIcon,
  [icons.USER_COMMENTS]: UserCommentsIcon,
  [icons.LIVE_COMMENTS]: LiveCommentsIcon,
};

const activeItemStyle = `cursor: pointer;
  color: ${coreLightMinus1};
  transition: color 0.2s;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: 0;
    left: 0;
    background: ${azureRadiance};
    transition: transform 0.2s;
    transform: scale(1);
  }

  svg path {
    fill: ${coreLightMinus1};
  }
`;

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  color: ${coreNeutral3};
  position: relative;
  padding: 23px 0;

  ${props =>
    !props.isLast &&
    css`
      margin-right: 15px;
      ${breakpoints.medium(css`
        margin-right: 40px;
      `)}
      ${breakpoints.large(css`
        margin-right: 52px;
      `)}
    `};

  &:after {
    content: '';
    height: 0;
    transition: transform 0.2s;
    transform: scale(0);
  }
  &:hover {
    ${activeItemStyle}
  }
  ${props =>
    props.isActive &&
    css`
      ${activeItemStyle}
    `}
`;

export const StyledLabel = styled.span`
  ${fontInterUi};
  font-size: 12px;
  font-weight: 600;
  vertical-align: middle;
  text-transform: uppercase;
  ${breakpoints.medium(css`
    margin-left: 5px;
  `)};
`;

const Icon = ({ icon, otherProps }) => {
  const IconName = iconsMap[icon];
  if (!IconName) return null;
  return <IconName {...otherProps} />;
};
Icon.defaultProps = {
  otherProps: {},
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  otherProps: PropTypes.object,
};

const StyledIconContainer = styled.div`
  height: 32px;
  width: 32px;
  display: none;
  ${breakpoints.large(css`
    display: inline-block;
  `)};

  > svg {
    height: 100%;
    width: 100%;
    path {
      fill: ${props => (props.isActive ? coreLightMinus1 : coreNeutral3)};
    }
  }
`;

export default class Tabs extends React.Component {
  state = {};

  componentDidMount() {
    const { defaultTab, tabs } = this.props;
    const defaultTabExist = tabs.some(el => el.key === defaultTab);
    let itemToSelect = defaultTab;
    if (!defaultTabExist && tabs && tabs.length) {
      itemToSelect = tabs[0].key;
    }
    this.handleClick(itemToSelect);
  }

  handleClick(key) {
    const { onItemSelected } = this.props;
    onItemSelected && onItemSelected(key);
    this.setState({ itemSelected: key });
  }

  render() {
    const { tabs } = this.props;
    const { itemSelected } = this.state;
    return (
      <>
        <Carousel alignCenter withArrow={false}>
          {tabs.map(({ label, icon, key }, index) => (
            <StyledItem
              data-test={key}
              key={key}
              onClick={() => this.handleClick(key)}
              isActive={itemSelected === key}
              isLast={index + 1 === tabs.length}
            >
              {icon && iconsMap[icon] && (
                <StyledIconContainer isActive={itemSelected === key}>
                  <Icon icon={icon} />
                </StyledIconContainer>
              )}
              <StyledLabel data-test="label">{label}</StyledLabel>
            </StyledItem>
          ))}
        </Carousel>
      </>
    );
  }
}

Tabs.defaultProps = {
  defaultTab: null,
  onItemSelected: null,
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.oneOf(Object.values(icons)).isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemSelected: PropTypes.func,
  defaultTab: PropTypes.string,
};
