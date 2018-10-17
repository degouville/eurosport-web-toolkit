import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button } from "../src/index.js";

storiesOf("Button", module).add("with text", () => (
  <Button>Hello Button</Button>
));
