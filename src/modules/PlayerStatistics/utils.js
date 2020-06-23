export const setStatsBar = ({ firstValue, secondValue, maximumValue, colorOne, colorTwo }) => {
  // NOTE: share values on a range of 100%
  const playerOne = Math.floor(((firstValue / maximumValue) * 100) / 2);
  const playerTwo = Math.floor(((secondValue / maximumValue) * 100) / 2);

  return `&:before {
        content: '';
        display: block;
        position: absolute;
        right: 50%;
        top: 0;
        bottom: 0;
        width: ${playerOne}%;
        background: ${colorOne};
        transition: width 0.3s ease-out;
      }
      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: ${playerTwo}%;
        background: ${colorTwo};
        transition: width 0.3s ease-out;
      }
  `;
};

export const addPercentMark = (isPercent = false, number) => `${number}${isPercent ? '%' : ''}`;
