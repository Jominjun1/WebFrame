import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import HomePage from './homePage';
import SignUp from './SignUp';
import usersData from './users.json';

function App() {
  const [users, setUsers] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [userName, setUserName] = useState(''); // Add a state variable to store the user's name

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('authenticated');
    const storedUserName = localStorage.getItem('userName'); // localStorage에서 사용자 이름을 로드
    if (storedAuthStatus === 'true') {
      setAuthenticated(true);
      setUserName(storedUserName); // localStorage에서 사용자 이름 설정
    }
    setUsers(usersData);
  }, []);

  const handleLogin = (name) => {
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('userName', name); // 사용자 이름을 localStorage에 저장
    setAuthenticated(true);
    setUserName(name); // 사용자의 이름을 설정
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userName'); // localStorage에서 사용자 이름을 제거
    setAuthenticated(false);
    setUserName(''); // 사용자 이름 지우기
  };

  const handleSignUp = (newUser) => {
    setUsers([...users, newUser]);
    setIsSignUpSuccess(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ authenticated ? ( <HomePage onLogout={handleLogout} userName={userName} /> ) :
           ( <Login Loginuser={handleLogin} users={users} /> ) } />
          <Route path="/signup" element={ isSignUpSuccess ? ( <Login Loginuser={handleLogin} users={users} /> ) :
           ( <SignUp onSignUp={handleSignUp} users={users}/> ) } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
