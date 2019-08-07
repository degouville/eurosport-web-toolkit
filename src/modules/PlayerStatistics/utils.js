export const setGradient = ({ firstValue, secondValue, maximumValue, colorOne, colorTwo }) => {
  // NOTE: share values on a range of 100%
  const b = Math.floor(((firstValue / maximumValue) * 100) / 2);
  const c = Math.floor(((secondValue / maximumValue) * 100) / 2);
  const a = 100 / 2 - b;

  const offset = a;
  const playerOne = offset + b;
  const playerTwo = playerOne + c;

  return `
    linear-gradient(
      to right,
      transparent 0%,
      transparent ${offset}%,
      ${colorOne} ${offset}%,
      ${colorOne} ${playerOne}%,
      ${colorTwo} ${playerOne}%,
      ${colorTwo} ${playerTwo}%,
      transparent ${playerTwo}%,
      transparent
    )
  `;
};

export const addPercentMark = (isPercent = false, number) => `${number}${isPercent ? '%' : ''}`;
