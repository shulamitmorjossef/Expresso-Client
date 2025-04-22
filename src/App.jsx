import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [useName, setUseName] = useState('');
  const [password, setPassword] = useState('');


  function submitLogin(event) {
    const userName = event.formData.get('useName');
    const password = event.formData.get('password');
    setUseName(userName);
    setPassword(password);
    setShouldSubmit(true);

  }


  return (
    <>

    <div className='card'>
      <form id = 'login-form' onSubmit={submitLogin}>
        <input type="text" id = 'userName' />
        <input type="password" id = 'password'/>
        <button type='submit'> Submit </button>
      </form>
    </div>

    </>
  );
}

export default App;
