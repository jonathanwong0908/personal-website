/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  name: "light",
  extend: {
    backgroundColor: {
      primary: colors.neutral[950],
      surface: {
        container: {
          low: colors.white,
          DEFAULT: colors.neutral[50],
          high: colors.neutral[100],
          higher: colors.neutral[200],
          highest: colors.neutral[900],
        },
      },
      campus: {
        DEFAULT: colors.neutral[900],
        high: colors.neutral[800],
        higher: colors.neutral[700],
        highest: colors.neutral[50],
      },
    },
    textColor: {
      display: {
        DEFAULT: colors.neutral[950],
        inverted: colors.neutral[50],
      },
      headline: colors.neutral[950],
      title: colors.neutral[950],
      body: colors.neutral[900],
      label: colors.neutral[800],
      muted: colors.neutral[400],
    },
    borderColor: {
      DEFAULT: colors.neutral[200],
      inverted: colors.neutral[700],
    },
  },
};
