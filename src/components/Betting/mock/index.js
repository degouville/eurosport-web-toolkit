export const doubleChoiceData = {
  link: 'mainLink',
  sponsor: {
    name: 'Betline',
    backgroundColor: '#b4292c',
    textColor: '#ffffff',
  },
  sentences: ['Pariez !', 'PARIEZ AVEC Betline'],
  choices: [{ number: 1, odds: '2.80', label: 'Nadal' }, { number: 2, odds: '1.70', label: 'Federer' }],
};

export const tripleChoiceData = {
  ...doubleChoiceData,
  choices: [
    { number: 1, odds: '2.80', label: 'Nadal' },
    { number: 2, odds: '4.90' },
    { number: 3, odds: '1.70', label: 'Federer' },
  ],
};

export const alternativeLogo = {
  ...doubleChoiceData,
  sponsor: {
    name: 'AlterBet',
    backgroundColor: '#6decb9',
    textColor: '#3c3c3c',
  },
  sentences: ['Alternate with AlterBet !', 'AlterBet for the BETter'],
};
