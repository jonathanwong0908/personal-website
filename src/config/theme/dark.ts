/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  name: "dark",
  extend: {
    backgroundColor: {
      background: colors.neutral[950],
    },
  },
};
