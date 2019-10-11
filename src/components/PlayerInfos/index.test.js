import React from 'react';
import { mount } from 'enzyme';
import { PlayerInfos } from '.';

const player = {
  firstName: 'Rafael',
  lastName: 'Nadal',
  age: '32',
  height: '1.85',
  weight: '85',
  country: 'Spain',
  flagUrl: 'https://i.eurosport.com/_iss_/geo/country/flag/medium/2203.png',
  ranking: '2',
  organisation: 'ATP',
  pictureUrl: 'https://i.eurosport.com/_iss_/person/pp_clubteam/large/435121.jpg',
};

describe('PlayerInfos', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PlayerInfos player={player} t={key => key} />);
  });

  it('renders its content', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the players infos with a player pictures URL', () => {
    expect(wrapper.find('[data-test="player-picture"]').prop('src')).toEqual(player.pictureUrl);
  });

  it('renders the players infos with a flag pictures URL', () => {
    expect(
      wrapper.find('[data-test="flag-picture"]').filterWhere(item => item.prop('src') === player.flagUrl)
    ).toHaveLength(2);
  });
});
