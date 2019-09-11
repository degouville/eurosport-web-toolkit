import React from 'react';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Grid, Cards } from '../..';

const gridStories = storiesOf('Elements|Grid', module);
const cardData = {
  img: 'https://i.eurosport.com/taiga/MagicBox/Crop/16_9/0_20180710-125830.jpeg?w=640',
  url: '/article/id',
  category: 'Tennis',
  title: 'Klopp happy with Chelsea draw after good performance',
  description: 'Day 2',
  timestamp: '09:00 - 10:30',
  channel: 'E2NO',
  liveLabel: 'live',
};

const StyledColumn = styled(Grid.Column)`
  margin-bottom: 10px;
`;

const StyledContainer = styled(Grid.Container)`
  background: lightblue;
`;

gridStories
  .add('Container', () => (
    <StyledContainer>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut laoreet ipsum et ipsum molestie, vel interdum quam
      auctor. Quisque ultricies erat quis commodo rhoncus. Curabitur mauris sem, tincidunt in leo ac, lacinia pulvinar
      mi. Nunc tempus dolor nibh, non tempus turpis fermentum quis. Nam rhoncus mauris eu auctor accumsan. Etiam quis
      volutpat quam, a efficitur purus. Duis elementum accumsan lobortis. Pellentesque luctus erat viverra, feugiat
      augue et, tincidunt tellus. Maecenas in quam et massa lobortis laoreet. Morbi bibendum neque eget efficitur
      mattis. Proin quis gravida lacus. Etiam mattis libero sit amet vulputate pharetra. Vivamus scelerisque placerat
      lectus vel mollis. Nunc dolor diam, volutpat malesuada facilisis non, accumsan quis nunc. Praesent ultricies,
      dolor ut tristique dignissim, enim mi suscipit erat, id mattis tellus augue vitae lectus. Aliquam egestas porta
      dolor, ac lobortis risus pulvinar ut. Nam volutpat est in nunc porttitor, quis porttitor mauris sollicitudin.
      Maecenas lobortis risus sodales neque bibendum aliquet. Fusce et dignissim dolor. Nunc eget tortor congue,
      tincidunt dolor vel, viverra eros. Morbi sit amet lorem in magna lacinia pharetra nec non odio. Aliquam eget
      tortor vel purus commodo consectetur. Phasellus molestie, enim in pharetra porttitor, augue urna elementum urna,
      eu vestibulum ipsum ante vel nulla.
    </StyledContainer>
  ))
  .add('Customize first column', () => (
    <Grid.Row>
      <Grid.Column
        tiny={select('tiny', Grid.SIX_COLUMNS, '6')}
        small={select('small', Grid.SIX_COLUMNS, '6')}
        medium={select('medium', Grid.TWELVE_COLUMNS, '7')}
        large={select('large', Grid.TWELVE_COLUMNS, '7')}
        wide={select('wide', Grid.TWELVE_COLUMNS, '7')}
        tinyOffset={select('tiny offset', Grid.SIX_OFFSETS, '0')}
        smallOffset={select('small offset', Grid.SIX_OFFSETS, '0')}
        mediumOffset={select('medium offset', Grid.TWELVE_OFFSETS, '0')}
        largeOffset={select('large offset', Grid.TWELVE_OFFSETS, '0')}
        wideOffset={select('wide offset', Grid.TWELVE_OFFSETS, '0')}
      >
        <Cards.Content card={cardData} type="vod" />
      </Grid.Column>
      <Grid.Column tiny="1">
        <Cards.Content card={cardData} type="vod" />
      </Grid.Column>
      <Grid.Column tiny="1">
        <Cards.Content card={cardData} type="vod" />
      </Grid.Column>
      <Grid.Column tiny="1">
        <Cards.Content card={cardData} type="vod" />
      </Grid.Column>
      <Grid.Column tiny="1">
        <Cards.Content card={cardData} type="vod" />
      </Grid.Column>
      <Grid.Column tiny="1">
        <Cards.Content card={cardData} type="vod" />
      </Grid.Column>
    </Grid.Row>
  ))
  .add('Basic grid', () => {
    const columns = [];
    for (let i = 0; i < 8; i += 1) {
      columns.push(
        <StyledColumn
          tiny={select('tiny', Grid.SIX_COLUMNS, 'full')}
          small={select('small', Grid.SIX_COLUMNS, 'full')}
          medium={select('medium', Grid.TWELVE_COLUMNS, '6')}
          large={select('large', Grid.TWELVE_COLUMNS, '4')}
          wide={select('wide', Grid.TWELVE_COLUMNS, '3')}
          key={i}
        >
          <Cards.Content card={cardData} type="vod" />
        </StyledColumn>
      );
    }
    return <Grid.Row>{columns}</Grid.Row>;
  });
