import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0984e3',
    },
    secondary: {
      main: '#00171f',
    },
    text: {
      primary: "#000",
      secondary: "#0984e3"
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#1d3557',
    },
  },

});


export default theme;
