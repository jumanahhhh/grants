import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#331D2C",
    },
    secondary: {
      main: "#3F2E3E",
    },
    background: {
      default: "#EFE1D1",
      paper: "#3F2E3E",
    },
    text: {
      primary: "#EFE1D1",
      secondary: "#A78295",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#A78295",
          color: "#EFE1D1",
          "&:hover": {
            backgroundColor: "#331D2C",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#331D2C",
          color: "#EFE1D1",
          borderColor: "#A78295",
        },
      },
    },
  },
})

export default theme

