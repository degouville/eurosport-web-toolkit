import React from 'react';
import { shallow } from 'enzyme';
import ActivatedComments, { StyledContentCss, StyledSpinnerWrapper } from './ActivatedComments';
import activatedCommentsConfig from './mockData/activatedComments.json';
import ScriptInjector from '../../components/ScriptInjector';

const requireSpy = jest.fn();

class ActivatedCommentsMock {
  constructor(spy) {
    this.spy = spy;
  }

  require(opts) {
    this.spy(opts);
    return this;
  }
}

describe('ActivatedComments', () => {
  let wrapper;

  beforeEach(() => {
    global.Livefyre = new ActivatedCommentsMock(requireSpy);
    wrapper = shallow(
      <ActivatedComments
        livefyreConfig={activatedCommentsConfig}
        loginCallback={() => null}
        logoutCallback={() => null}
        userToken=""
      />
    );
  });

  it('renders an activated UserComments Component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the loader waiting for the script to be loaded', () => {
    expect(wrapper.find(StyledSpinnerWrapper)).toHaveLength(1);
    expect(wrapper.find(StyledContentCss)).toHaveLength(0);
  });

  it('renders the Livefyre widget once script is loaded', () => {
    wrapper.setState({ isWidgetLoaded: true });
    expect(wrapper.find(StyledContentCss)).toHaveLength(1);
    expect(wrapper.find(StyledSpinnerWrapper)).toHaveLength(0);
  });

  it('should pass Livefyre script src to ScriptInjector', () => {
    expect(wrapper.find(ScriptInjector).props().src).toBe(activatedCommentsConfig.config.scriptUrl);
  });

  describe('Livefyre init', () => {
    it('should init Livefyre Widget when script is loaded', () => {
      wrapper.find(ScriptInjector).simulate('load');
      expect(requireSpy).toHaveBeenCalledWith(['fyre.conv#3', 'auth']);
    });

    it('should get getNetworkConfig with the good values', () => {
      const networkConfig = ActivatedComments.getNetworkConfig(activatedCommentsConfig);
      expect(networkConfig).toEqual({
        network: activatedCommentsConfig.config.networkDomain,
        strings: activatedCommentsConfig.labels,
      });
    });

    it('should get getConvConfig with the good values', () => {
      const convConfig = ActivatedComments.getConvConfig(activatedCommentsConfig);
      expect(convConfig).toEqual({
        siteId: activatedCommentsConfig.config.siteId,
        articleId: activatedCommentsConfig.collection.articleId,
        el: 'livefyre',
        collectionMeta: activatedCommentsConfig.collection.collectionMeta,
        checksum: activatedCommentsConfig.collection.checksum,
      });
    });
  });
});
