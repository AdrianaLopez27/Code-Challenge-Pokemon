import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/layout/NavBar';
import HomeDashboard from './components/layout/HomeDashboard';
import Pokemon from './components/screen/Pokemon';
import EditPokemon from './components/screen/EditPokemon';
import CreatePokemon from './components/screen/CreatePokemon';
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar></NavBar> 
        <div class='container'>
          <Routes>
              
              <Route path="/" element={<HomeDashboard />} />
              <Route path="/pokemon/:pokemonId" element={<Pokemon />} />
              <Route path="/pokemon/:pokemonId/edit" element={<EditPokemon />} />
              <Route path="/pokemon/create" element={<CreatePokemon />} />
          </Routes>
            
        </div>
      </div>
    </Router>
  );
}

export default App;
