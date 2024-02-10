/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  name: "light",
  extend: {
    backgroundColor: {
      background: colors.slate[100],
    },
    textColor: {
      display: colors.slate[800],
    },
  },
};
