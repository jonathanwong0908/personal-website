/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  name: "light",
  extend: {
    backgroundColor: {
      background: colors.slate[50],
      secondary: colors.slate[100],
      "background-inverted": colors.slate[950],
      "secondary-inverted": colors.slate[900],
    },
    textColor: {
      display: colors.slate[900],
      body: colors.slate[800],
      muted: colors.slate[500],
      subdued: colors.slate[300],
      "display-inverted": colors.slate[50],
      "body-inverted": colors.slate[300],
      "muted-inverted": colors.slate[500],
      "subdued-inverted": colors.slate[600],
      warning: colors.red[400],
    },
    borderColor: {
      DEFAULT: colors.slate[300],
      inverted: colors.slate[800],
    },
  },
};
