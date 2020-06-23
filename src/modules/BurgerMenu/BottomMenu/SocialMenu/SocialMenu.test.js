import React from 'react';
import { shallow } from 'enzyme';
import SocialMenu from './SocialMenu';
import headerMock from '../../mocks/feed-menu.mock';

const socialItems = headerMock.header.find(i => i.id === 7).sections[0].items;

it('renders with expected snapshot on desktop', () => {
  expect(shallow(<SocialMenu items={socialItems} name="follow us on socials" isMobile={false} />)).toMatchSnapshot();
});

it('renders with expected snapshot on mobile', () => {
  expect(shallow(<SocialMenu items={socialItems} name="follow us on socials" isMobile />)).toMatchSnapshot();
});

it('does not render when no items', () => {
  expect(shallow(<SocialMenu items={[]} name="follow us on socials" isMobile={false} />).type()).toEqual(null);
});
