import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import PlayerPromotionBox, { StyledItem } from '.';

const texts = [
  'Watch your favourite sports live and on demand',
  'Stream to your device at home and on the go',
  'Grand Slam tennis, cycling, motorsports and much more',
];

describe('PlayerPromotionBox', () => {
  it('renders its content', () => {
    expect(
      mount(
        <ThemeProvider theme={theme}>
          <PlayerPromotionBox
            title="Watch Eurosport"
            textButton="Find out more"
            texts={texts}
            pictureUrl="https://www.eurosport.fr/watch-eurosport-react/static/media/features-summary-1024.fe17bcd2.jpg"
            linkButton="https://www.eurosport.fr/regardez-eurosport-en-direct.shtml?int_campaign=player-france-prospect-allsports-undefined&int_content=home-toolbar-button-watch"
          />
        </ThemeProvider>
      )
    ).toMatchSnapshot();
  });

  it('display each list item regarding the texts provided', () => {
    const wrapper = shallow(
      <PlayerPromotionBox
        title="Watch Eurosport"
        textButton="Find out more"
        texts={texts}
        pictureUrl="https://www.eurosport.fr/watch-eurosport-react/static/media/features-summary-1024.fe17bcd2.jpg"
        linkButton="https://www.eurosport.fr/regardez-eurosport-en-direct.shtml?int_campaign=player-france-prospect-allsports-undefined&int_content=home-toolbar-button-watch"
      />
    );
    expect(wrapper.find(StyledItem).length).toEqual(3);
  });
});
