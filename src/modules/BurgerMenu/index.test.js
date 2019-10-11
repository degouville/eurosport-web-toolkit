import React from 'react';
import { render, shallow } from 'enzyme';
import BurgerMenuWithMedia, { BurgerMenu } from './index';
import menu from './mocks/feed-menu.mock';

describe('<BurgerMenu />', () => {
  it('renders with expected snapshot on mobile 1', () => {
    expect(
      render(<BurgerMenu isOpen onClose={jest.fn()} homePageUrl="" items={menu.header} isMobileMenu />)
    ).toMatchSnapshot();
  });

  it('renders with expected snapshot on desktop', () => {
    expect(
      render(<BurgerMenu isOpen onClose={jest.fn()} homePageUrl="" items={menu.header} isMobileMenu={false} />)
    ).toMatchSnapshot();
  });
});

describe('required `isMobileMenu` prop is injected to <BurgerMenu /> by default', () => {
  global.matchMedia = () => ({ matches: true, addListener: jest.fn() });

  it('has `isMobileMenu` prop defined', () => {
    expect(
      shallow(
        <BurgerMenuWithMedia items={menu.header} onClose={jest.fn()} homePageUrl="" isOpen isMobileMenu={false} />
      )
        .find(BurgerMenu)
        .prop('isMobileMenu')
    ).toBe(true);
  });
});
