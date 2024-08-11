import { useState } from 'react'  
import './App.css'


import InputForm from './components/InputForm';

function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <h1 className=''><span>Todo</span>&nbsp; App</h1>
      <InputForm />
    </>
  )
}

export default App
