import localFont from "next/font/local";

export const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/general-sans/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/general-sans/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/general-sans/GeneralSans-Bold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});
