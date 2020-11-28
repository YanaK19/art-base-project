import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MenuBar/>
        <Routes/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
