export const afterLabels = [
  {
    text: 'French Open',
    bold: true,
    color: 'white',
  },
  {
    text: "Men's singles | Final",
    color: 'blue',
  },
  {
    text: 'Result',
    color: 'cyan',
  },
];

export const duringLabels = [
  {
    text: 'French Open',
    bold: true,
    color: 'white',
  },
  {
    text: "Men's singles | Final",
    color: 'blue',
  },
  {
    text: 'Live',
    color: 'red',
    icon: '•',
  },
];

export const beforeLabels = [
  {
    text: 'French Open',
    bold: true,
    color: 'white',
  },
  {
    text: "Men's singles | Final",
    color: 'blue',
  },
];

export const scoreDataDuring = {
  topTeam: {
    playerOneName: 'A. MENENDEZ-MACEIRAS',
    playerTwoName: 'A. Rahman MAKSSOUD',
    sets: [
      {
        set: 1,
        score: 6,
        won: true,
        tie: null,
      },
      {
        set: 2,
        score: 6,
        won: true,
        tie: null,
      },
      {
        set: 3,
        score: 6,
        won: false,
        tie: 2,
      },
      {
        set: 4,
        score: 6,
        won: true,
        tie: null,
      },
      {
        set: 5,
        score: 3,
        won: false,
        tie: null,
      },
    ],
    hasWon: null,
    isServing: false,
  },
  bottomTeam: {
    playerOneName: 'A. MENENDEZ-MACEIRAS',
    playerTwoName: 'A. DAVIDOVICH FOKINA',
    sets: [
      {
        set: 1,
        score: 3,
        won: false,
        tie: null,
      },
      {
        set: 2,
        score: 3,
        won: true,
        tie: null,
      },
      {
        set: 3,
        score: 7,
        won: true,
        tie: 7,
      },
      {
        set: 4,
        score: 3,
        won: false,
        tie: null,
      },
      {
        set: 5,
        score: 5,
        won: false,
        tie: null,
      },
    ],
    hasWon: null,
    isServing: true,
  },
};

export const scoreDataAfter = {
  ...scoreDataDuring,
  topTeam: {
    ...scoreDataDuring.topTeam,
    hasWon: false,
  },
  bottomTeam: {
    ...scoreDataDuring.bottomTeam,
    sets: [
      ...scoreDataDuring.bottomTeam.sets.slice(0, 4),
      {
        set: 5,
        score: 7,
        won: true,
        tie: null,
      },
    ],
    isServing: false,
    hasWon: true,
  },
};
