import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'react-emotion';
import { object, text } from '@storybook/addon-knobs';
import { ViewMore } from '../..';
import { coreLightMinus1 } from '../../colors';

const viewmore = storiesOf('Modules|ViewMore', module);

const labels = {
  showLess: 'View less',
  showMore: 'View more',
};

const Wrapper = styled.div`
  color: ${coreLightMinus1};
`;

const Element = styled.div`
  margin-bottom: 15px;
`;

const children = [];
for (let i = 0; i < 10; i += 1) {
  children.push(<Element key={i}>match</Element>);
}

viewmore.add('viewmore', () => (
  <Wrapper>
    <ViewMore showMoreText={text('showMoreText', labels.showMore)} showLessText={text('showLessText', labels.showLess)}>
      {object('children', children)}
    </ViewMore>
  </Wrapper>
));
