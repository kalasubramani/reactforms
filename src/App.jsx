import { useState } from 'react'
import './App.css'
import SignUpForm from './components/signupForm'
import Authenticate from './components/authenticate'

function App() {
  const [authToken,setAuthToken]=useState(null);

  return (
    <div className='container'>
      <h3>React Forms</h3>
      <div className="card">
        {/* components for signup and authentication */}
        <SignUpForm setAuthToken={setAuthToken}/>
        <Authenticate authToken={authToken}/>
      </div>
     
    </div>
  )
}

export default App
