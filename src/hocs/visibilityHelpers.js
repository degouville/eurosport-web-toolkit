const closestPolyfill = () => {
  if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

  if (!Element.prototype.closest) {
    Element.prototype.closest = function closest(s) {
      let el = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
};

closestPolyfill();

const isElement1ParentOfElement2 = (parent, child) => {
  // eslint-disable-next-line no-nested-ternary
  const selector = parent.id ? `#${parent.id}` : parent.className ? parent.className : parent.tagName;
  const closestRoot = child.closest(selector);
  return closestRoot === parent;
};

export const isOnViewPort = element => {
  const domRect = element.getBoundingClientRect();
  const { clientHeight, clientWidth } = document.documentElement;
  const visibleV = domRect.top <= clientHeight && domRect.top + domRect.height >= 0;
  const visibleH = domRect.left <= clientWidth && domRect.left + domRect.width >= 0;

  return visibleH && visibleV;
};

export const isTopMost = (element, minPoints = 1, offset = 10) => {
  const domRect = element.getBoundingClientRect();
  const halfWidth = domRect.width / 2;
  const halfHeight = domRect.height / 2;
  const topLeft = [domRect.left + offset, domRect.top + offset];
  const bottomLeft = [domRect.left + offset, domRect.bottom - offset];
  const topRight = [domRect.right - offset, domRect.top + offset];
  const bottomRight = [domRect.right - offset, domRect.bottom - offset];
  const center = [domRect.left + halfWidth, domRect.top + halfHeight];
  const pointsMatched = [topLeft, bottomLeft, topRight, bottomRight, center]
    .map(coords => {
      const matchedElement = document.elementFromPoint(...coords);

      if (matchedElement === null) return false;

      return matchedElement === element || isElement1ParentOfElement2(element, matchedElement);
    })
    .filter(Boolean).length;

  return pointsMatched >= minPoints;
};
