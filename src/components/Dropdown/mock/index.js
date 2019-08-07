export const dropdownOptions = [
  { text: 'Men singles', id: 1231 },
  { text: 'Women singles', id: 1232 },
  { text: 'Men doubles', id: 1233 },
  { text: 'Women doubles', id: 1234 },
  { text: 'Men triples', id: 1235 },
  { text: 'Women triples', id: 1236 },
];

export const initialOptionID = dropdownOptions[3].id;

export default {
  ...dropdownOptions,
  ...initialOptionID,
};
