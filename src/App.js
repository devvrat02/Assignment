import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Candidate from './Candidate';
import CandidateList from './Candidate/CandidateList';

function App() {
  let token=localStorage.getItem('token');

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/*Default is login Page  */}
        <Route path='/' element={<Login/>}/>
        {/* Registration or Sign up Component */}
        <Route path='/Register' element={<Register/>}/>
        {/* Candidate Form */}
        <Route path='/Candidate' element={(token)?<Candidate/>:<Login/>}/>
       {/* Candidate List/Data Table */}
        <Route path='/CandidateL' element={(token)?<CandidateList/>:<Login/>}/>
        <Route path='*' element={<Login/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
