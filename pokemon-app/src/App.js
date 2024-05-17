import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/layout/NavBar';
import HomeDashboard from './components/layout/HomeDashboard';
import Pokemon from './components/screen/Pokemon';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar></NavBar> 
        <div class='container'>
          <Routes>
              
              <Route path="/" element={<HomeDashboard />} />
              <Route path="/pokemon/:pokemonId" element={<Pokemon />} />
            
          </Routes>
            
        </div>
      </div>
    </Router>
  );
}

export default App;
