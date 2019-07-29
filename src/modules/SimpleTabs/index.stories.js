import React from 'react';
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Global, css } from '@emotion/core';
import { object, select } from '@storybook/addon-knobs';
import SimpleTabs from '.';

const tabs = storiesOf('Modules|SimpleTabs', module);

const mockData = [
  {
    label: '1st Round',
    highligthed: true,
    href: '#1',
  },
  {
    label: '2nd Round',
    highligthed: true,
    href: '#2',
  },
  {
    label: '3rd Round',
    href: '#3',
  },
  {
    label: '4th Round',
    href: '#4',
  },
  {
    label: 'Quarterfinals',
    href: '#5',
  },
  {
    label: 'Semi-final',
    disabled: true,
    href: '#6',
  },
  {
    label: 'Final',
    disabled: true,
    href: '#7',
  },
];

class TabExample extends React.Component {
  state = {
    currentTab: 2,
  };

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/prop-types
    const { initialTab } = nextProps;
    this.setState({ currentTab: initialTab });
  }

  changeTab(href, tabIndex) {
    this.setState({ currentTab: tabIndex });
  }

  render() {
    const { currentTab } = this.state;

    return (
      <>
        <Global
          styles={css`
            .tabItem {
              display: none;
              color: white;
              padding-top: 40px;
              font-size: 30px;
            }
          `}
        />

        <SimpleTabs
          initialTabIndex={currentTab}
          /* eslint-disable-next-line react/jsx-no-bind */
          onItemSelected={this.changeTab.bind(this)}
          tabs={object('tabs', mockData)}
        />
        {mockData.map((el, i) => (
          <div className="tabItem" style={{ display: i === currentTab ? 'block' : 'none' }} key={el.label}>
            {`Selected tab: ${el.label}`}
          </div>
        ))}
      </>
    );
  }
}

tabs.add('default', () => <TabExample initialTab={select('initialTabIndex', mockData.map((el, i) => i), 2)} />);
