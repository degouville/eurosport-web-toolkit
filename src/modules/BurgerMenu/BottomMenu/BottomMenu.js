import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import SocialMenu from './SocialMenu/SocialMenu';
import Link from '../../../elements/Link';
import { coreNeutral2, coreDarkBase } from '../../../colors';
import { large, medium } from '../../../breakpoints';
import { PRIVACY_SETTINGS_ID } from '../constants';

const StyledContainer = styled.div`
  width: 100%;
  min-height: 68px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: ${coreDarkBase};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 20px;

  ${medium(css`
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0 30px;
    align-items: center;
    justify-content: space-between;
  `)}
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 5px 0 10px;

  ${medium(css`
    padding: 6px 0 10px;
  `)}
`;

const StyledListItem = styled.li`
  display: inline-block;
  color: ${coreNeutral2};
  font-size: 9px;
  line-height: 12px;

  ${large(css`
    line-height: normal;
    font-size: 12px;
  `)};

  &:not(:last-child)::after {
    content: '|';
    padding: 0 7px;
  }

  a {
    color: ${coreNeutral2};
    text-decoration: none;
  }
`;

export default class BottomMenu extends React.Component {
  state = {
    isQuantCastEnabled: false,
  };

  componentDidMount() {
    this.setState({
      // eslint-disable-next-line no-underscore-dangle
      isQuantCastEnabled: typeof window.__cmp !== 'undefined',
    });
  }

  renderUsualLink = ({ link, name, id }) => (
    <StyledListItem key={id}>
      <Link href={link.url} target={link.blank ? '__blank' : 'self'}>
        {name}
      </Link>
    </StyledListItem>
  );

  renderQuantCastLink = ({ name, id }) => (
    <StyledListItem key={id}>
      <Link
        data-test="burger-privacy"
        href="#quantcast"
        onClick={e => {
          e.preventDefault();
          // eslint-disable-next-line no-underscore-dangle
          window.__cmp('displayConsentUi', 2, true);
        }}
      >
        {name}
      </Link>
    </StyledListItem>
  );

  getLinks = () => {
    const { links } = this.props;
    const { isQuantCastEnabled } = this.state;

    return (
      <StyledList>
        {links.map(i => {
          if (i.link && i.link.url) {
            return this.renderUsualLink(i);
          }
          if (i.id === PRIVACY_SETTINGS_ID && isQuantCastEnabled) {
            return this.renderQuantCastLink(i);
          }
          return null;
        })}
      </StyledList>
    );
  };

  getSocialMenu = () => {
    const { socials, isMobileMenu } = this.props;

    if (!socials) return null;

    const { items = [] } = socials.sections.length && socials.sections[0];

    return <SocialMenu items={items} name={socials.name} isMobile={isMobileMenu} />;
  };

  render() {
    return (
      <StyledContainer>
        {this.getSocialMenu()}
        {this.getLinks()}
      </StyledContainer>
    );
  }
}

BottomMenu.displayName = 'BottomMenu';

BottomMenu.defaultProps = {
  links: null,
  socials: null,
  isMobileMenu: false,
};

BottomMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      sections: PropTypes.arrayOf(
        PropTypes.shape({
          items: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string,
              blank: PropTypes.bool,
              name: PropTypes.string,
              icon: PropTypes.string,
            })
          ),
        })
      ),
    })
  ),
  socials: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        items: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
            blank: PropTypes.bool,
            name: PropTypes.string,
            icon: PropTypes.string,
          })
        ),
      })
    ),
  }),
  isMobileMenu: PropTypes.bool,
};
