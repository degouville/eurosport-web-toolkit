# Contributing

Each PR should have an approving review from one person from the other two teams.

## Requirements

1. Each component must have an associated story for the storybook documentation. These stories should be placed in the folder with the component and named `index.stories.js`.
2. Components should have at least a base snapshot test, along with unit tests for each conditional branch.
3. Components should spread props onto the top level component, for example: `const Comp = ({...props}) => <div {...props} />`, this should have a test
4. `PropTypes` are required, with a max of 2 levels of `shape` nesting.
5. Add `defaultProps` when necessary, for example if it fails to render without.
6. When using emotion, use `styled.div` over `styled('div')` unless restyling React components