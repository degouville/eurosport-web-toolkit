# Contributing

Each PR should have an approving review from one person from the other two teams.

## Requirements

1. Each component must have an associated story for the storybook documentation. These stories should be placed in the folder with the component and named `index.stories.js`.
2. Components should have at least a base snapshot test, along with unit tests for each conditional branch.
3. Components should spread props onto the top level component, for example: `const Comp = ({...props}) => <div {...props} />`, this should have a test
4. `PropTypes` are required, with a max of 2 levels of `shape` nesting.
5. Add `defaultProps` when necessary, for example if it fails to render without.
6. When using emotion, use `styled.div` over `styled('div')` unless restyling React components

## Adding SVGs

### SVG as Data URI

You can `import` a SVG right in a JavaScript module. This tells Babel to include that file in the bundle. Importing a file gives you a [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) instead of a path.

Here is an example:

```js
import React from 'react';
import logo from '../../assets/eurosport.svg'; // Tell Babel this JS file uses this image

console.log(logo); // data:image/svg+xml;base64,PH...==

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Eurosport logo" />;
}

export default Header;
```

### SVG as React components

You can also `import` a SVG directly as a React component like this:

```js
import Logo from '../../assets/eurosport.component.svg';

const App = () => (
  <div>
    {/* Logo is an actual React component */}
    <Logo />
  </div>
);
```

What's important to note is that the SVG asset should have the extension `.component.svg` to let Babel know that it should inline it as a React Component. This is handy if you don't want to load SVG as a separate file.
