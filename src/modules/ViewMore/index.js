import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { rgba } from 'polished';
import { throttle, get } from 'lodash';
import { SizeMe } from 'react-sizeme';
import { coreLightMinus1, coreLightBase, coreDarkPlus1 } from '../../colors';
import { fontAlphaHeadlineBold } from '../../typography';

export const StyledViewMoreButtonWrapper = styled.div``;

export const StyledViewMoreButton = styled.span`
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
  ${({ blockHeight, animate, isDelayGone, animationDelay }) =>
    css`
      max-height: ${blockHeight !== 0 ? `${blockHeight}px` : 'auto'};
      transition: ${animate ? `max-height ${animationDelay}ms ease` : 'none'};
      overflow: ${isDelayGone ? 'unset' : 'hidden'};

      // NOTE: <SizeMe> required to have an extra height to render properly
      border-top: 1em solid transparent;
      margin-top: -1em;
    `}
`;

class ViewMore extends React.Component {
  listRef = React.createRef();

  state = {
    animate: true,
    isDelayGone: false,
  };

  handleWindowResize = throttle(() => this.setState({ animate: false }), 250);

  componentDidMount() {
    // It is better to set the default value of expanded after the initial mount.
    // Otherwise the first render will not be accurate as the listRef might not be set yet.
    this.setState({ expanded: false });
    window.addEventListener('resize', this.handleWindowResize);
  }

  shouldComponentUpdate() {
    const element = get(this, 'listRef.current');
    return element && element.clientHeight > 0;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    clearInterval(this.delayTimer);
  }

  computeBlockHeight(height) {
    const { showLessItemCount } = this.props;
    const { expanded } = this.state;
    const listElement = get(this, 'listRef.current', {});
    const listChildren = get(listElement, 'children', []);
    const shouldExpand = expanded || showLessItemCount >= listChildren?.length;
    const expandedSize = height;
    const unExpandedSize = listChildren[showLessItemCount]?.offsetTop;
    const hasChildren = listChildren?.length > 0;
    const currentSize = shouldExpand ? expandedSize : unExpandedSize;
    return hasChildren ? currentSize : 0;
  }

  handleDelay() {
    this.setState(({ isDelayGone }) => ({ isDelayGone: !isDelayGone }));
  }

  handleClick() {
    const { animationDelay } = this.props;
    const { isDelayGone, animate } = this.state;

    this.setState(({ expanded }) => ({
      expanded: !expanded,
      animate: true,
    }));

    if (isDelayGone) {
      this.setState({ isDelayGone: !isDelayGone });
    } else {
      this.setState({ animate: !animate });
      this.delayTimer = setTimeout(() => this.handleDelay(), animationDelay);
    }
  }

  renderStyledList(height) {
    const { children, animationDelay } = this.props;
    const { expanded, animate, isDelayGone } = this.state;

    return (
      <StyledList
        isExpanded={expanded}
        innerRef={this.listRef}
        blockHeight={this.computeBlockHeight(height)}
        animate={animate}
        isDelayGone={isDelayGone}
        animationDelay={animationDelay}
      >
        {children}
      </StyledList>
    );
  }

  render() {
    const { children, showLessText, showMoreText, showLessItemCount } = this.props;
    const { expanded } = this.state;
    if (!children || !children.length) return null;

    return (
      <>
        <SizeMe monitorHeight render={({ size: { height } }) => this.renderStyledList(height)} />

        {children?.length > 1 && children?.length > showLessItemCount && (
          <StyledViewMoreButtonWrapper>
            <StyledViewMoreButton onClick={() => this.handleClick()}>
              {expanded ? showLessText : showMoreText}
            </StyledViewMoreButton>
          </StyledViewMoreButtonWrapper>
        )}
      </>
    );
  }
}

ViewMore.defaultProps = {
  showLessItemCount: 1,
  showLessText: 'show less',
  showMoreText: 'show more',
  animationDelay: 400,
};

ViewMore.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  showLessText: PropTypes.string,
  showMoreText: PropTypes.string,
  showLessItemCount: PropTypes.number,
  animationDelay: PropTypes.number,
};

export default ViewMore;
