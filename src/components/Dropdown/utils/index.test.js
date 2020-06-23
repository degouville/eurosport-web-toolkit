import { removeUnit } from '.';

describe('utils', () => {
  describe('removeUnit', () => {
    it('should remove pixel unit from height', () => {
      // Given
      const height = '300px';

      // When
      const heightWithoutUnit = removeUnit(height);

      // Expect
      expect(heightWithoutUnit).toBe(300);
    });

    it('should remove meter unit from distance, when a space exists', () => {
      // Given
      const distance = '100 m';

      // When
      const distanceWithoutUnit = removeUnit(distance);

      // Expect
      expect(distanceWithoutUnit).toBe(100);
    });
  });
});
