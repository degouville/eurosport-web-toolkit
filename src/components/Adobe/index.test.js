import React from 'react';
import { shallow, mount } from 'enzyme';
import { Adobe } from '../..';

describe('<Adobe /> head script client side', () => {
  it('renders <Adobe />', () => {
    const component = shallow(<Adobe src="srcUrl" isServerSide={false} />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('adds the adobe script in the <head>', () => {
    const component = mount(<Adobe src="scriptSourceURL" isServerSide={false} />);
    const adobeScript = global.document.getElementById('adobe-script');
    expect(adobeScript).toBeDefined();
    component.unmount();
  });

  it('sets the right src url', () => {
    const component = mount(<Adobe src="urlToTest" isServerSide={false} />);
    const adobeScript = global.document.getElementById('adobe-script');
    expect(adobeScript.getAttribute('src')).toEqual('urlToTest');
    component.unmount();
  });
});

describe('<Adobe /> head script server side', () => {
  it('adds script tag with isServerSide', () => {
    const wrapper = mount(<Adobe src="srcURL" isServerSide />);
    expect(wrapper.exists('#adobe-script')).toEqual(true);
    wrapper.unmount();
  });

  it('calls pageBottom method on _satellite object', () => {
    const satelliteInjector = `_satellite = {}; _satellite.pageBottom = function() {window.document.mockCounter = 2};`;
    const script = document.createElement('script');
    script.innerHTML = satelliteInjector;
    document.body.appendChild(script);
    // eslint-disable-next-line no-unused-vars
    const component = mount(<Adobe src="srcURL" isServerSide />);
    expect(global.document.mockCounter).toEqual(2);
    component.unmount();
  });
});
