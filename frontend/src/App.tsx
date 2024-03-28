import { useState } from 'react'
import './App.css'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Card from './components/Card'
import Edit from './components/Edit'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Card/>}></Route>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
