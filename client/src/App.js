import './App.css';
import FileUpload from './components/FileUpload';
import UploadForm from './components/UploadForm';

function App() {
  return (
      <div className="App">
        <UploadForm/>
        
        <FileUpload/>
      </div>
  );
}

export default App;
