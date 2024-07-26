"use client";
import { createTheme } from "@mui/material/styles";
import { viVN } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#47cc58",
        100: "#e0fbd4",
        200: "#b9f59f",
        300: "#a4f482",
      },
      secondary: {
        main: "#4B70F5",
      },
      info: {
        main: "#3DC2EC",
      },
      warning: {
        main: "#FF7F3E",
        900: "#F4CE14",
        200: "#FFF455",
        100: "#FAFFAF",
      },
      error: {
        main: "#FF0000",
        200: "#FFCAD4",
      },
      success: {
        main: "#06D001",
      },
      background: { default: "rgb(245 245 245)", paper: "#fdfdfd" },
      divider: "#dddddd",
      text: { primary: "#000000", secondary: "#888888", disabled: "#adadad" },
      grey: { A100: "#f3f3f3" },
      mode: "light",
      common: { black: "#000", white: "#fff" },
      action: {},
    },
    zIndex: {
      fab: 4444,
      drawer: 5555,
      modal: 6666,
      tooltip: 7777,
      snackbar: 8888,
      speedDial: 9999,
    },
    typography: {
      fontFamily: "inherit",
      body1: {
        fontSize: 16,
      },
      body2: {
        fontSize: 14,
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: 14,
        fontWeight: 500,
      },
      h6: {
        fontSize: 18,
        fontWeight: 600,
      },
      h5: {
        fontSize: 20,
        fontWeight: 600,
      },
      h4: {
        fontSize: 22,
        fontWeight: 600,
      },
      h3: {
        fontSize: 24,
        fontWeight: 600,
      },
      h2: {
        fontSize: 26,
        fontWeight: 600,
      },
      h1: {
        fontSize: 28,
        fontWeight: 600,
      },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiContainer: {
        defaultProps: { maxWidth: "xl" },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            fontSize: "14px",
            height: "45px",
            "&:hover": { boxShadow: "none" },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: { root: { fontSize: "14px" } },
      },
    },
  },
  viVN
);
export default theme;
