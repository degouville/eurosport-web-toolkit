const liveMatch = {
  isLive: true,
  isWatchable: true,
  matchUrl: 'https://eurosport.com',
  data: {
    topTeam: {
      playerOneName: 'MENENDEZ-MACEIRAS',
      sets: [
        { set: 1, score: 6, won: true, tie: null },
        { set: 2, score: 6, won: true, tie: null },
        { set: 3, score: 6, won: false, tie: null },
        { set: 4, score: 6, won: true, tie: null },
        { set: 5, score: 3, won: false, tie: null },
      ],
      isServing: true,
    },
    bottomTeam: {
      playerOneName: 'DAVIDOVICH FOKINA',
      sets: [
        { set: 1, score: 3, won: false, tie: null },
        { set: 2, score: 3, won: false, tie: null },
        { set: 3, score: 7, won: true, tie: null },
        { set: 4, score: 3, won: false, tie: null },
        { set: 5, score: 6, won: true, tie: null },
      ],
      isServing: false,
    },
  },
};

const upcomingMatch = {
  isLive: false,
  isWatchable: false,
  matchUrl: 'https://eurosport.com',
  data: {
    topTeam: {
      playerOneName: 'MENENDEZ-MACEIRAS',
      sets: [],
      isServing: false,
    },
    bottomTeam: {
      playerOneName: 'DAVIDOVICH FOKINA',
      sets: [],
      isServing: false,
    },
  },
};

const finishedMatch = {
  isLive: false,
  isWatchable: false,
  matchUrl: 'https://eurosport.com',
  data: {
    topTeam: {
      playerOneName: 'RAHMAN MAKSSOUD',
      sets: [
        { set: 1, score: 6, won: true, tie: null },
        { set: 2, score: 6, won: true, tie: null },
        { set: 3, score: 6, won: false, tie: 2 },
        { set: 4, score: 6, won: true, tie: null },
        { set: 5, score: 3, won: false, tie: null },
      ],
      isServing: false,
      hasWon: true,
    },
    bottomTeam: {
      playerOneName: 'DAVIDOVICH FOKINA',
      sets: [
        { set: 1, score: 3, won: false, tie: null },
        { set: 2, score: 3, won: false, tie: null },
        { set: 3, score: 7, won: true, tie: 7 },
        { set: 4, score: 3, won: false, tie: null },
        { set: 5, score: 6, won: true, tie: null },
      ],
      isServing: false,
      hasWon: false,
    },
  },
};

export const liveMatches = new Array(8).fill().map((el, index) => ({ id: index, ...liveMatch }));

export const upcomingMatches = new Array(5).fill().map((el, index) => ({ id: index, ...upcomingMatch }));

export const finishedMatches = new Array(8).fill().map((el, index) => ({ id: index, ...finishedMatch }));
