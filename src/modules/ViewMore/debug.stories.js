// TODO: This file is here for the moment because we will have to test this behaviour we the new design

import React, { useState, useEffect, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from 'react-emotion';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Global } from '@emotion/core';
import { object, text, number, select } from '@storybook/addon-knobs';
import { random } from 'lodash';
import { ViewMore, Button } from 'src';
import { white } from '../../colors';
import SimpleTabs from '../SimpleTabs';

const viewmore = storiesOf('Modules|ViewMore', module);

const labels = {
  showLess: 'View less',
  showMore: 'View more',
};

const Wrapper = styled.div`
  color: ${white};
`;

const StyledElement = styled.div`
  margin-bottom: 15px;
  height: ${({ height: h }) => h}px;
  transition: height 1s;
`;

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const tick = () => savedCallback.current();
    if (delay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

// eslint-disable-next-line react/prop-types
const Element = ({ id }) => {
  const min = 16;
  const [height, setHeight] = useState(min);
  const randomHeight = random(min, min * (id + 1));

  useInterval(() => setHeight(randomHeight), 2000);

  return <StyledElement height={height}>Match</StyledElement>;
};

const createChildren = (x, i) => <Element key={i} id={i} />;
const createChildrens = n =>
  Array(n)
    .fill()
    .map(createChildren);

const childrens = [createChildrens(8), createChildrens(4)];

const mockData = [
  {
    label: '1st Round',
    highlighted: true,
    href: '#1',
  },
  {
    label: '2nd Round',
    highlighted: true,
    href: '#2',
  },
];

class TabExample extends React.Component {
  state = {
    currentTab: 1,
    filter: null,
  };

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/prop-types
    const { initialTab } = nextProps;
    this.setState({ currentTab: initialTab });
  }

  changeTab(href, tabIndex) {
    this.setState({ currentTab: tabIndex });
  }

  filteredChildrens() {
    const { currentTab, filter } = this.state;
    const hasIndexAbove = (x, i) => i <= filter;
    return filter ? childrens[currentTab].filter(hasIndexAbove) : childrens[currentTab];
  }

  updateFilter() {
    const { currentTab } = this.state;
    const childrensCount = childrens[currentTab].length;
    const filter = random(1, childrensCount);
    this.setState({ filter });
  }

  render() {
    const { currentTab } = this.state;
    return (
      <>
        <Global
          styles={css`
            p {
              color: red;
            }
            ,
            .tabItem {
              display: none;
              color: white;
              padding-top: 40px;
              font-size: 30px;
            }
          `}
        />

        <Button onClick={() => this.updateFilter()}>UPDATE MATCHES</Button>

        <SimpleTabs
          initialTabIndex={currentTab}
          /* eslint-disable-next-line react/jsx-no-bind */
          onItemSelected={this.changeTab.bind(this)}
          tabs={object('tabs', mockData)}
        />
        <p>{`There is ${this.filteredChildrens().length} loaded matches.`}</p>

        <Wrapper>
          {/* childrens[currentTab] */}
          <ViewMore
            showMoreText={text('showMoreText', labels.showMore)}
            showLessText={text('showLessText', labels.showLess)}
            showLessItemCount={number('showLessItemCount', 1)}
          >
            {this.filteredChildrens()}
          </ViewMore>
        </Wrapper>
      </>
    );
  }
}

viewmore.add('debug viewmore', () => (
  <TabExample initialTab={select('initialTabIndex', mockData.map((el, i) => i), 2)} />
));
