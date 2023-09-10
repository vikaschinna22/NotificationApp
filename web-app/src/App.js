import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import NewNotes from './pages/NewNotes';
import ManageNotes from './pages/ManageNotes';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';



function App() {  
  const {currentUser}  = useContext(AuthContext)
 
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path ='/' element = {<Home/>}>
                <Route path ='/' element = {
                  currentUser.user?<NewNotes/>:<Navigate to='/login'/>
                }/>
              <Route  path='managenotes' element={ 
                currentUser.user?<ManageNotes/>:<Navigate to='/login'/>
              }/>  
              </Route>
              <Route path='/login' element ={currentUser.user?<Navigate to='/'/>:<LoginPage/>}/> 
              <Route exact path='*' element = {<Navigate to="/login" />} />
            </Routes>
          </Router>
      </div>
    );
  }
  export default App;