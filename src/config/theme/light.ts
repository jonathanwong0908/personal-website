/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  name: "light",
  extend: {
    backgroundColor: {
      background: colors.slate[50],
      inverted: colors.slate[950],
    },
    textColor: {
      display: colors.slate[800],
      body: colors.slate[600],
      inverted: colors.slate[50],
    },
  },
};
