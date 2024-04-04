
import './App.css'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Todo from './components/Todo'
import Signup from './components/SignUp'
import Signin from './components/Signin'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/todo' element={<Todo/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
