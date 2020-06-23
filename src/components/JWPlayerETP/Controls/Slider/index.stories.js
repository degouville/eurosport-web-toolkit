import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import theme from 'src/theme';
import Slider from './index';

const stories = storiesOf('Components|JWPlayerETP', module);

const SliderControl = props => {
  const [progress, setProgress] = useState(50);
  return <Slider value={progress} onChange={setProgress} defaultValue={50} {...props} />;
};

stories.add('Slider horizontal', () => <SliderControl {...theme.playerControls.seek} />);
stories.add('Slider vertical', () => (
  <div style={{ width: 500, height: 500 }}>
    <SliderControl {...theme.playerControls.volume} />
  </div>
));
