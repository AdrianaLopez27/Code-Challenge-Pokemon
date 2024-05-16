import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/layout/NavBar';
import HomeDashboard from './components/layout/HomeDashboard';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar> 
      <div class='container'>
        <HomeDashboard></HomeDashboard>
      </div>
    </div>
  );
}

export default App;
