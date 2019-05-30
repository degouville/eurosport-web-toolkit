import React from 'react';
import { mount } from 'enzyme';
import ViewMore, { StyledViewMoreButton } from '.';

const labels = {
  showLess: 'View less',
  showMore: 'View more',
};

const children = [];
for (let i = 0; i < 10; i += 1) {
  children.push(<div key={i}>match</div>);
}

describe('ViewMore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders its content', () => {
    const wrapper = mount(
      <ViewMore showLessText={labels.showLess} showMoreText={labels.showMore}>
        {children}
      </ViewMore>
    );
    jest.spyOn(wrapper.instance(), 'shouldComponentUpdate').mockImplementation(() => true);
    wrapper.setState({ expanded: false });
    expect(wrapper).toMatchSnapshot();
  });
  describe('items behavior', () => {
    it('should display the button with the right label', () => {
      const wrapper = mount(
        <ViewMore showLessText={labels.showLess} showMoreText={labels.showMore}>
          {children}
        </ViewMore>
      );
      jest.spyOn(wrapper.instance(), 'shouldComponentUpdate').mockImplementation(() => true);

      wrapper.setState({ expanded: true });
      expect(wrapper.find(StyledViewMoreButton).text()).toContain(labels.showLess);
      wrapper.setState({ expanded: false });
      expect(wrapper.find(StyledViewMoreButton).text()).toContain(labels.showMore);
    });

    it('should update the state when the button is clicked', () => {
      const wrapper = mount(
        <ViewMore showLessText={labels.showLess} showMoreText={labels.showMore}>
          {children}
        </ViewMore>
      );
      expect(wrapper.state().expanded).toEqual(false);
      wrapper.find(StyledViewMoreButton).simulate('click');
      expect(wrapper.state().expanded).toEqual(true);
      wrapper.find(StyledViewMoreButton).simulate('click');
      expect(wrapper.state().expanded).toEqual(false);
    });
  });
});
