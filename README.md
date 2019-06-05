# Eurosport Web Toolkit

<p>
<a href="https://www.npmjs.com/package/@eurosport/web-toolkit">
    <img src="https://img.shields.io/npm/v/@eurosport/web-toolkit.svg"
         alt="npm version">
 </a>
</p>

A collection of components to share common functionality across teams.

[View the storybook](https://es-web-toolkit.netlify.com)

## How to use

`npm install @eurosport/web-toolkit emotion@9 react-emotion@9 emotion-theming@9 polished@2`

All available components are exported as named exports so you can pull them in easily:

```jsx
import { ThemeProvider } from 'emotion-theming';
import { injectStyles, theme, Button } from '@eurosport/web-toolkit';

injectStyles();

const MyApp = () => (
  <ThemeProvider theme={theme}>
    <Button>Hello!</Button>
  </ThemeProvider>
);
```

Also many components rely on non embed assets that should be copied from `@eurosport/web-toolkit/dist/assets/**` to a folder named `eurosport-web-toolkit` inside your public assets folder. For example you can add the following `preinstall` and `postinstall` scripts to your package.json to achieve that.

package.json

```json
{
  ...
  "scripts": {
    ...
    "preinstall": "rm -rf ./public/eurosport-web-toolkit/",
    "postinstall": "cp -a ./node_modules/@eurosport/web-toolkit/dist/assets/. ./public/eurosport-web-toolkit/"
  },
  ...
}
```

then a simple `yarn` or `npm install` will transparently handle this for you from now on.

## Documentation

### Link

The Link component use a default prop "linkComponent" which is a function returning an anchor tag. If you want to override this behaviour, you can specify a custom function in your app as below :

```jsx
import { RouterLink } from 'react-router-dom';
import { Link } from '@eurosport/web-toolkit';

Link.defaultProps.linkComponent = ({ href, children, ...props }) => (
  <RouterLink {...props} to={href}>
    {children}
  </RouterLink>
);
```

If a component defines a prop "linkComponent", then you can override the link behaviour for one instance of this component, by passing a custom function to this prop.

```jsx
import { RouterLink } from 'react-router-dom';
import { Card } from '@eurosport/web-toolkit';

const overridenLink = ({ href, children, ...props }) => (
  <RouterLink {...props} to={href}>
    {children}
  </RouterLink>
);

const cardData = {};

<Card.Content card={cardData} type="article" linkComponent={overridenLink} />;
```

###### web-toolkit dependencies which needs to be installed on your own:

```
"emotion": "9",
"emotion-theming": "9",
"polished": "2",
"prop-types": "15",
"react": "16",
"react-emotion": "9"
```
