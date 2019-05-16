import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { azureRadiance, coreLightMinus1, stormGray } from '../../colors';
import { fontAlphaHeadlineBold } from '../../typography';
import Carousel from '../../components/Carousel';
import * as icons from './icon-type';
import * as breakpoints from '../../breakpoints';
import AllMatchesIcon from '../../assets/tabs/all-matches.svg';
import MatchIcon from '../../assets/tabs/match.svg';
import UserCommentsIcon from '../../assets/tabs/user-comments.svg';
import LiveCommentsIcon from '../../assets/tabs/live-comments.svg';

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
        transform: scale(1);`;

export const StyledItem = styled.div`
  color: ${stormGray};
  position: relative;
  padding-bottom: 23px;
  margin-right: 15px;
  &:after {
    content: '';
    height: 0;
    transition: transform 0.2s;
    transform: scale(0);
  }
  &:hover {
    ${activeItemStyle}
    }
  }
  ${props =>
    props.isActive &&
    css`
      ${activeItemStyle}
    `}
`;

const BaseIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  background: no-repeat center;
  background-size: 22px 22px;
  ${breakpoints.large(css`
    background-size: 32px 32px;
  `)};
`;

const StyledIcon = styled(BaseIcon)`
  display: none;
  background-image: url(${props => props.icon});
  ${breakpoints.medium(css`
    display: inline-block;
  `)};
`;

export const StyledLabel = styled.span`
  ${fontAlphaHeadlineBold};
  font-size: 12px;
  ${breakpoints.medium(css`
    font-size: 16px;
    font-weight: bold;
    margin-left: 9px;
  `)};
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
    this.setState({ itemSelected: itemToSelect });
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
          {tabs.map(({ label, icon, key }) => (
            <StyledItem data-test={key} key={key} onClick={() => this.handleClick(key)} isActive={itemSelected === key}>
              {icon && iconsMap[icon] && <StyledIcon icon={iconsMap[icon]} />}
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
