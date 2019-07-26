import React from 'react';
import { render, mount, shallow } from 'enzyme';
import DataLayer from '.';
import dataLayerMock from './mocks/dataLayerMock';

describe('<DataLayer />', () => {
  it('renders with expected snapshot', () => {
    expect(render(<DataLayer dataLayer={dataLayerMock.dataLayer} />)).toMatchSnapshot();
  });

  it('renders with expected dataLayer props', () => {
    // eslint-disable-next-line no-unused-vars
    mount(<DataLayer dataLayer={dataLayerMock.dataLayer} />);
    expect(window.dataLayer[0]).toMatchObject(dataLayerMock.dataLayer);
  });

  it('should not render when no datalayer is passed', () => {
    const wrapper = shallow(<DataLayer />);
    expect(wrapper.find('DataLayer').exists()).toBeFalsy();
  });
});
