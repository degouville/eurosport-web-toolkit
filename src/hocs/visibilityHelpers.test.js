import { closestPolyfill, isElement1ParentOfElement2, isOnViewPort, isTopMost } from './visibilityHelpers';

describe('hocs/visibilityHelpers', () => {
  describe('isOnViewPort', () => {
    it('Should return true when element is visible on viewport', () => {
      // Given
      document.body.innerHTML = `<div id="foo">Foo</div>`;
      const element = document.getElementById('foo');

      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        height: 100,
        left: 0,
        top: 0,
        width: 100,
      }));

      // When
      const result = isOnViewPort(element);

      // Expect
      expect(result).toBeTruthy();
    });

    it('Should return false when element is not visible on viewport', () => {
      // Given
      document.body.innerHTML = `<div id="bar">Bar</div>`;
      const element = document.getElementById('bar');

      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        height: 50,
        left: -100,
        top: 0,
        width: 50,
      }));

      // When
      const result = isOnViewPort(element);

      // Expect
      expect(result).toBeFalsy();
    });
  });

  describe('closestPolyfill', () => {
    it('should add matches polyfill on Element prototype', () => {
      // Given
      Element.prototype.matches = undefined;

      // When
      closestPolyfill();

      // Expect
      expect(typeof Element.prototype.matches).toBe('function');
    });

    it('should add closest polyfill on Element prototype', () => {
      // Given
      Element.prototype.closest = undefined;

      // When
      closestPolyfill();

      // Expect
      expect(typeof Element.prototype.closest).toBe('function');
    });
  });

  describe('isElement1ParentOfElement2', () => {
    it('Should return true when first element is parent of second element', () => {
      // Given
      document.body.innerHTML = `
        <div id="first-element">
          <div id="second-element">Second element</div>
        </div>
      `;
      const firstElement = document.getElementById('first-element');
      const secondElement = document.getElementById('second-element');

      // When
      const result = isElement1ParentOfElement2(firstElement, secondElement);

      // Expect
      expect(result).toBeTruthy();
    });

    it('Should return false when first element is not parent of second element', () => {
      // Given
      document.body.innerHTML = `
        <div id="first-element"></div>
        <div id="second-element"></div>
      `;
      const firstElement = document.getElementById('first-element');
      const secondElement = document.getElementById('second-element');

      // When
      const result = isElement1ParentOfElement2(firstElement, secondElement);

      // Expect
      expect(result).toBeFalsy();
    });
  });

  describe('isTopMost', () => {
    it('Should return true when matched element is same element', () => {
      // Given
      document.body.innerHTML = `
        <div id="foo">Foo</div>
      `;
      const element = document.getElementById('foo');

      document.elementFromPoint = jest.fn(() => element);

      // When
      const result = isTopMost(element, 1, 0);

      // Expect
      expect(result).toBeTruthy();
    });

    it('Should return false when matched element is not found', () => {
      // Given
      document.body.innerHTML = `
        <div id="foo">Foo</div>
      `;
      const element = document.getElementById('foo');

      document.elementFromPoint = jest.fn(() => null);

      // When
      const result = isTopMost(element, 1, 0);

      // Expect
      expect(result).toBeFalsy();
    });
  });
});
