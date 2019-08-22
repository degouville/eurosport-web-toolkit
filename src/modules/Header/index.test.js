import { shallow, mount } from 'enzyme/build';
import React from 'react';
import Header, { Breadcrumbs } from '.';
import Link from '../../elements/Link';
import Logo from '../../elements/Logo';

import menu from '../BurgerMenu/mocks/feed-menu';
import BurgerMenu from '../BurgerMenu';
import BurgerIcon from '../../elements/BurgerIcon';

describe('Header', () => {
  const breadcrumbs = [
    { name: 'Tennis', url: 'http://eurosport.fr/tennis/' },
    { name: 'French Open', url: 'http://eurosport.fr/tennis/open-d-australie/' },
  ];

  it('renders Header', () => {
    expect(shallow(<Header />)).toMatchSnapshot();
  });

  describe('with submenu', () => {
    beforeAll(() => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));
    });

    it('renders Header with BurgerMenu', () => {
      const wrapper = shallow(<Header menuItems={menu.header} breadcrumbs={breadcrumbs} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('click on BurgerIcon opens a submenu', () => {
      const wrapper = shallow(<Header menuItems={menu.header} />);
      wrapper.find(BurgerIcon).simulate('click', {
        preventDefault: () => {},
      });
      expect(wrapper.find(BurgerMenu)).toHaveLength(1);
      expect(wrapper.find(BurgerMenu).prop('isOpen')).toBe(true);
    });

    it('should open the menu with a specific selected menu item', () => {
      const wrapper = mount(<Header menuItems={menu.header} />);
      wrapper.instance().toggleBurgerMenu(null, 5);
      wrapper.update();
      expect(
        wrapper
          .find(BurgerMenu)
          .childAt(0)
          .state('selectedMenuId')
      ).toEqual(5);
    });
  });

  describe('with cta', () => {
    it('renders Header with cta', () => {
      const cta = { link: 'www.eurosport.fr', label: 'subscribe' };
      const wrapper = shallow(<Header cta={cta} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should accept other props', () => {
    const component = shallow(<Header data-test-id="header" />);

    expect(component.props()).toHaveProperty('data-test-id', 'header');
  });

  it('should render all breadcrumbs on desktop res', () => {
    global.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addListener: () => {},
    }));

    const wrapper = mount(<Header menuItems={menu.header} breadcrumbs={breadcrumbs} />);
    expect(wrapper.find(Breadcrumbs).find(Link).length).toBe(2);

    global.matchMedia = null;
  });

  describe('Breadcrumbs mobile', () => {
    beforeAll(() => {
      global.matchMedia = jest.fn().mockImplementation(media => ({
        matches: +media.replace(/\D/g, '') > 700,
        addListener: () => {},
      }));
    });

    afterAll(() => {
      global.matchMedia = null;
    });

    it('should render only last breadcrumb on mobile res', () => {
      const wrapper = mount(<Header breadcrumbs={breadcrumbs} />);
      const link = wrapper.find(Breadcrumbs).find(Link);
      expect(link.length).toBe(1);
      expect(link.text()).toEqual('French Open');
    });

    it('should not render Logo on mobile with breadcrumbs', () => {
      const wrapper = mount(<Header breadcrumbs={breadcrumbs} />);
      expect(wrapper.find(Logo).length).toEqual(0);
    });

    it('should render logo on mobile when there is no breadcrumbs', () => {
      const wrapper = mount(<Header />);
      expect(wrapper.find(Logo).length).toEqual(1);
    });
  });
});
