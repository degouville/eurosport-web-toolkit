import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { rgba } from 'polished';
import get from 'lodash/get';
import throttle from 'lodash/throttle';
import { coreLightMinus1, coreLightBase, coreDarkPlus1 } from '../../colors';
import { fontAlphaHeadlineBold } from '../../typography';

export const StyledButton = styled.span`
  color: ${coreLightBase};
  ${fontAlphaHeadlineBold};
  border: 1px solid ${rgba(coreLightMinus1, 0.35)};
  background: ${rgba(coreDarkPlus1, 0.2)};
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 11px;
  padding: 6px 14px;
  line-height: 11px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledList = styled.ul`
  overflow: hidden;
  ${props =>
    css`
      max-height: ${props.blockHeight !== 0 ? `${props.blockHeight}px;` : 'auto;'}
      transition: ${props.animate ? 'max-height 400ms ease;' : 'none;'}
    `}
`;

export default class ViewMore extends React.Component {
  listRef = React.createRef();

  state = {
    animate: true,
  };

  handleWindowResize = throttle(() => this.setState({ animate: false }), 250);

  componentDidMount() {
    // It is better to set the default value of expanded after the initial mount.
    // Otherwise the first render will not be accurate as the listRef might not be set yet.
    this.setState({ expanded: false });
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  computeBlockHeight() {
    const { showLessItemCount } = this.props;
    const { expanded } = this.state;
    const listElement = get(this, 'listRef.current', {});
    const listChildren = get(listElement, 'children', []);

    let height = 0;
    if (listChildren.length > 0)
      height =
        expanded || showLessItemCount >= listChildren.length
          ? listElement.scrollHeight
          : listChildren[showLessItemCount].offsetTop - listElement.offsetTop;

    return height;
  }

  handleClick() {
    this.setState(state => ({
      expanded: !state.expanded,
      animate: true,
    }));
  }

  render() {
    const { children, showLessText, showMoreText } = this.props;
    const { expanded, animate } = this.state;
    if (!children || !children.length) return null;
    return (
      <>
        <StyledList
          isExpanded={expanded}
          innerRef={this.listRef}
          blockHeight={this.computeBlockHeight()}
          animate={animate}
        >
          {children}
        </StyledList>
        {children.length > 1 && (
          <StyledButton onClick={() => this.handleClick()}>{expanded ? showLessText : showMoreText}</StyledButton>
        )}
      </>
    );
  }
}

ViewMore.defaultProps = {
  showLessItemCount: 1,
  showLessText: 'show less',
  showMoreText: 'show more',
};

ViewMore.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  showLessText: PropTypes.string,
  showMoreText: PropTypes.string,
  showLessItemCount: PropTypes.number,
};
