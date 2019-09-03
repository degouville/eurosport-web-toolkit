import PropTypes from 'prop-types';

export const option = PropTypes.shape({
  id: PropTypes.number,
  text: PropTypes.string,
});

export const round = PropTypes.shape({
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const label = PropTypes.shape({ text: PropTypes.string.isRequired });

export const set = PropTypes.shape({
  set: PropTypes.number,
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tie: PropTypes.number,
  won: PropTypes.bool,
});

export const teamData = PropTypes.shape({
  hasWon: PropTypes.bool,
  isServing: PropTypes.bool,
  playerOneName: PropTypes.string,
  playerTwoName: PropTypes.string,
  playerOneImage: PropTypes.string,
  playerTwoImage: PropTypes.string,
  sets: PropTypes.arrayOf(set),
});

export const schedule = PropTypes.shape({
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
});

export const simpleTab = PropTypes.shape({
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  disabled: PropTypes.boolean,
  highlighted: PropTypes.boolean,
});

export const scoreBlock = PropTypes.shape({
  matchUrl: PropTypes.string.isRequired,
  data: PropTypes.shape({
    bottomTeam: teamData,
    topTeam: teamData,
  }).isRequired,
  schedule,
  isLive: PropTypes.bool,
  isWatchable: PropTypes.bool,
  displayLeftCircle: PropTypes.oneOf(['won', 'lost', false]),
  hasButton: PropTypes.bool,
});
