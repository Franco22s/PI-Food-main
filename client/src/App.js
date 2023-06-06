import './App.css';
import { Route, Routes} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import HomePage from './Components/HomePage/HomePage';
import Detail from './Components/Detail/Detail.jsx'
import CreateRecipe from './Components/CreateRecipe/CreateRecipe';

function App() {

  return (
    <div className="App">
    
      <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/home" element={<HomePage />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/CreateRecipe" element={<CreateRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
