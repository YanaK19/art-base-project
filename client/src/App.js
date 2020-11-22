import './App.css';
//import UploadForm from './components/UploadForm';
//import WithPreviews from './components/uploadWithPreview';
//import FileUpload from './components/FileUpload';
//import UploadForm from './components/UploadForm';
//import Uploads from './components/Uploads';
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import MenuBar from './components/MenuBar';

function App() {
  console.log(window.location.pathname);

  return (
    <BrowserRouter>
      <MenuBar/>
      <Routes/>
    </BrowserRouter>
  );
}

export default App;
