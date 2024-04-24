
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Aboutus from "./pages/aboutus"
import EditPreferences from './pages/EditPreferences';
import Navbar from './pages/Navbar';
import OnBoarding from './pages/OnBoarding';
import TinderCards from './pages/Tindercard';
import Chats from './pages/Chats';

function App() {
  return (
    <div className="App">
      <Router> 
        <div>
          <Navbar/>
        <Routes>  

          {/* Contains all our routes to pages in our application */}
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/editPreferences" element={<EditPreferences/>}/>
          <Route path="/onBoarding" element={<OnBoarding/>}/>
          <Route path="/swipe" element={<TinderCards/>}/>
          <Route path="/chats" element={<Chats/>}/>
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
