import PropTypes from 'prop-types';

export const option = {
  id: PropTypes.number,
  text: PropTypes.string,
};

export const round = {
  id: PropTypes.number,
  number: PropTypes.number.isRequired,
  name: PropTypes.string,
};

export const label = { text: PropTypes.string.isRequired };

export const set = {
  set: PropTypes.number,
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tie: PropTypes.number,
  won: PropTypes.bool,
};

export const teamData = PropTypes.shape({
  hasWon: PropTypes.bool,
  isServing: PropTypes.bool,
  playerOneName: PropTypes.string,
  playerTwoName: PropTypes.string,
  playerOneImage: PropTypes.string,
  playerTwoImage: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.shape(set)),
});

export const schedule = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export const simpleTab = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  disabled: PropTypes.boolean,
  highlighted: PropTypes.boolean,
};

export const scoreBlock = {
  matchUrl: PropTypes.string.isRequired,
  data: PropTypes.shape({
    bottomTeam: teamData,
    topTeam: teamData,
  }).isRequired,
  schedule: PropTypes.shape(schedule),
  isLive: PropTypes.bool,
  isWatchable: PropTypes.bool,
  displayLeftCircle: PropTypes.oneOf(['won', 'lost', false]),
  hasButton: PropTypes.bool,
};

export const audioTracks = PropTypes.arrayOf(
  PropTypes.shape({
    autoselect: PropTypes.bool,
    defaulttrack: PropTypes.bool,
    groupid: PropTypes.string,
    hlsjsIndex: PropTypes.number,
    language: PropTypes.string,
    name: PropTypes.string,
  })
);
