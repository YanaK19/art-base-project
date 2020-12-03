import './App.scss';
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const font =  "'Nerko One', cursive";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    fontSize: 20
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <MenuBar/>
          <Routes/>
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
