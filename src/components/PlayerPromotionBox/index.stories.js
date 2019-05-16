import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import { PlayerPromotionBox } from '../..';

const playerpromotionbox = storiesOf('Components|PlayerPromotionBox', module);

const texts = [
  'Watch your favourite sports live and on demand',
  'Stream to your device at home and on the go',
  'Grand Slam tennis, cycling, motorsports and much more',
];

playerpromotionbox.add('Player Promotion Box', () => (
  <PlayerPromotionBox
    title={text('title', 'Watch Eurosport')}
    textButton={text('textButton', 'Find out more')}
    texts={object('texts', texts)}
    pictureUrl={text(
      'pictureUrl',
      'https://www.eurosport.fr/watch-eurosport-react/static/media/features-summary-1024.fe17bcd2.jpg'
    )}
    linkButton={text(
      'linkButton',
      'https://www.eurosport.fr/regardez-eurosport-en-direct.shtml?int_campaign=player-france-prospect-allsports-undefined&int_content=home-toolbar-button-watch'
    )}
  />
));
