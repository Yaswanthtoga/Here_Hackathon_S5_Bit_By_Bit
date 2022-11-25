import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import './App.css'
import AddGeoMap from "./components/AddGeoMap";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path = "/" element={<Home/>}/>
          <Route path = "/map/:name" element={<AddGeoMap/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
