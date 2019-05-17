import React from 'react';
import { shallow } from 'enzyme';
import UserComments from '.';
import DeactivatedComments from './DeactivatedComments';
import activatedCommentsConfig from './mockData/activatedComments.json';
import deactivatedCommentsConfig from './mockData/deactivatedComments.json';

describe('UserComments', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <UserComments
        livefyreConfig={activatedCommentsConfig}
        loginCallback={() => null}
        logoutCallback={() => null}
        userToken=""
      />
    );
  });

  it('renders a UserComments Component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders an activated UserComments Component', () => {
    expect(wrapper.find('ActivatedComments')).toHaveLength(1);
  });

  it('renders a deactivated UserComments Component', () => {
    wrapper.setProps({
      livefyreConfig: { deactivatedCommentsConfig },
    });
    expect(wrapper.find(DeactivatedComments)).toHaveLength(1);
  });
});
