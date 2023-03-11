import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Tweet from './component/Tweet';
import Profile from "./component/Profile"
import ProfileMy from './component/ProfileMy';
import Logout from './component/Logout';
function App() {
  return (
    <div className='app'>
      <Router>
      
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          {/* <Route exact path="/posts" element={<PostOverview />}></Route> */}
          <Route exact path="/Home" element={<Home />}>
         
            
          </Route>
          <Route exact path = "/logout" element = {<Logout/>}></Route>
          <Route exact path = "/profile/:id" element = {<Profile/>}></Route>
          <Route exact path="/tweet/:tweetid" element={<Tweet />}></Route>
          {/* <Route exact path="/Profile" element={<ProfileMy  />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;