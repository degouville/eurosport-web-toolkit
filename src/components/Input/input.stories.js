import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import Input from './input.component';

const indexStories = storiesOf('Components|Input', module);

const ControlledInput = props => {
  const [value, setValue] = useState('');
  const onChange = useCallback(event => setValue(event.target.value), [setValue]);
  return <Input {...props} value={value} onChange={onChange} />;
};

indexStories
  .add('text input', () => (
    <Input
      placeholder={text('placeholder', 'EMAIL ADDRESS')}
      type="text"
      value={text('value', 'test@eurosport.com')}
      onChange={() => null}
      hasLabelInside={boolean('hasLabelInside', true)}
    />
  ))
  .add('text input controlled', () => (
    <ControlledInput
      placeholder={text('placeholder', 'EMAIL ADDRESS')}
      type="text"
      hasLabelInside={boolean('hasLabelInside', true)}
    />
  ))
  .add('password input', () => (
    <Input
      placeholder={text('placeholder', 'SECRET PASSWORD')}
      type="password"
      value={text('value', 'secret')}
      onChange={() => null}
      textButton="SHOW"
      hasLabelInside={boolean('hasLabelInside', false)}
    />
  ))
  .add('password input controlled', () => (
    <ControlledInput
      placeholder={text('placeholder', 'SECRET PASSWORD')}
      type="password"
      textButton="SHOW"
      hasLabelInside={boolean('hasLabelInside', true)}
    />
  ));
