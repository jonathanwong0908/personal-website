/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  name: "dark",
  extend: {
    backgroundColor: {
      primary: colors.white,
      surface: {
        container: {
          low: colors.black,
          DEFAULT: colors.neutral[950],
          high: colors.neutral[900],
          higher: colors.neutral[800],
          highest: colors.neutral[50],
        },
      },
      campus: {
        DEFAULT: colors.neutral[50],
        high: colors.neutral[100],
        higher: colors.neutral[200],
        highest: colors.neutral[950],
      },
    },
    textColor: {
      display: {
        DEFAULT: colors.neutral[50],
        inverted: colors.neutral[950],
      },
      headline: colors.neutral[50],
      title: colors.neutral[50],
      body: colors.neutral[50],
      label: colors.neutral[50],
      muted: colors.neutral[500],
    },
    borderColor: {
      DEFAULT: colors.neutral[800],
      inverted: colors.neutral[300],
    },
  },
};
