import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { ArticleContent } from '../..';

const article = storiesOf('Components|ArticleContent', module);

const data = {
  teaser:
    'Liverpool manager Jurgen Klopp described the pre-match praise he received from Napoli boss Carlo Ancelotti as tactics before the teams play each other in the League.',
  html:
    '<p>Liverpool have carried their fine domestic form into Europe and beat Paris St Germain 3-2 in their Group C opener.</p> <p>Ancelotti hailed last year’s finalists as one of the strongest teams in Europe in his news conference, but Klopp suggested the Italian was playing mind games.</p> <p>“I like Carlo Ancelotti. In Germany we say he’s a smart fox. He’s said very positive things about us and nice things about me before a game. It’s nice... but it’s tactics. Carlo is so long in the business,” Klopp told reporters on Tuesday.</p> <p>“We’re ready for a real battle. I don’t care too much for what people say about us, how they see our situation... tomorrow we need to step up. This is a fantastic manager, a fantastic team and an emotional crowd so that will be a real challenge.</p> <p>Liverpool thrashed Napoli 5-0 in a pre-season friendly in August but Klopp said he would tell his side to forget that result and focus on the challenge ahead at the San Paolo stadium.</p> <p>“It was a pre-season friendly, in Dublin, nothing else,” The German said. “It was very Liverpool-orientated, and we scored with each shot pretty much. Napoli had a lot of chances and didn’t score. That’s absolutely not important.</p> <p>“We didn’t talk about that game. It has nothing to do with the preparation for this game. Napoli is really organised with quality in all departments and that makes it a good team.</p> <p>“The good news for us is that we’re not too bad as well, that’s why we’re looking forward to the game, but it will be difficult for both.”</p>',
};

article
  .addParameters({
    backgrounds: { disable: true },
  })
  .add('base', () => <ArticleContent teaser={text('teaser', data.teaser)} html={text('html', data.html)} />);
