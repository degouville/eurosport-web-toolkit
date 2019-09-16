import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'react-emotion';
import { object, text, number } from '@storybook/addon-knobs';
import { ViewMore } from '../..';
import { white } from '../../colors';

const viewmore = storiesOf('Modules|ViewMore', module);

const labels = {
  showLess: 'View less',
  showMore: 'View more',
};

const Wrapper = styled.div`
  color: ${white};
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
    <ViewMore
      showMoreText={text('showMoreText', labels.showMore)}
      showLessText={text('showLessText', labels.showLess)}
      showLessItemCount={number('showLessItemCount', 1)}
    >
      {object('children', children)}
    </ViewMore>
  </Wrapper>
));
