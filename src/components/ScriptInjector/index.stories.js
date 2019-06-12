import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { ScriptInjector } from '../..';

const stories = storiesOf('Components|ScriptInjector', module);

const innerHTML = `
  (() => console.log('hello world'))();
`;

stories.add(
  'ServerSide',
  () => (
    <ScriptInjector
      isServer
      src={text('src', 'url.to.custom.script.js')}
      async={boolean('async', true)}
      innerHTML={text('innerHTML', innerHTML)}
    />
  ),
  {
    info: 'injectPlace prop is not used for server side renderring',
  }
);

const clientSideScriptSrc = 'scriptInjector.client.side';
const injectPlaceMessage = 'injectPlace prop is used only client - side';

stories
  .add(
    'ClientSide - in body',
    () => <ScriptInjector isServer={false} src={`${clientSideScriptSrc}.in.body`} injectPlace="body" async={false} />,
    {
      info: injectPlaceMessage,
    }
  )
  .add(
    'ClientSide - async in head',
    () => <ScriptInjector isServer={false} async src={`${clientSideScriptSrc}.in.head`} />,
    {
      info: injectPlaceMessage,
    }
  )
  .add(
    'ClientSide - with inner script - in body',
    () => <ScriptInjector isServer={false} innerHTML={`console.log('script injected in body')`} injectPlace="body" />,
    {
      info: injectPlaceMessage,
    }
  )
  .add(
    'ClientSide - with inner script - in head',
    () => <ScriptInjector isServer={false} innerHTML={`console.log('script injected in head')`} />,
    {
      info: injectPlaceMessage,
    }
  );
