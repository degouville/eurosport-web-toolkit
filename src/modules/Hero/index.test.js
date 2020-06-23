import { mount, shallow } from 'enzyme/build';
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import Hero from '.';

const getAuthorMock = () => ({
  name: 'Author name',
});

describe('Hero', () => {
  it('renders Hero', () => {
    expect(
      mount(
        <ThemeProvider theme={theme}>
          <Hero author={getAuthorMock()} title="Title" img="Picture" />
        </ThemeProvider>
      )
    ).toMatchSnapshot();
  });

  it('should accept other props', () => {
    const component = shallow(<Hero author={getAuthorMock()} title="Title" img="Picture" data-test-id="hero" />);
    expect(component.props()).toHaveProperty('data-test-id', 'hero');
  });
});
