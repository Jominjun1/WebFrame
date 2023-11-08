import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from './users.json';

const SignUp = ({ onSignUp, users }) => {
  const [newUser, setNewUser] = useState({ id: '', password: '', email: '' });
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setIsUsernameTaken(false);
  };

  const handleSignUp = () => {
    const isTaken = users.some((user) => user.id === newUser.id);
    if (isTaken) {
      setIsUsernameTaken(true);
    } else {
      onSignUp(newUser);
      usersData.push(newUser);
      setNewUser({ id: '', password: '', email: '' });
      setIsSignUpSuccess(true);
      navigate('/');
    }
  };

  return (
    <div>
      <h2>회원 가입</h2>
      <input type="text" name="id" placeholder="아이디" value={newUser.id} onChange={handleInputChange}/>
      <br />
      <input type="password" name="password" placeholder="비밀번호" value={newUser.password} onChange={handleInputChange}/>
      <br />
      <input type="text" name="email" placeholder="이메일 주소" value={newUser.email} onChange={handleInputChange}/>
      <br />
      <button onClick={handleSignUp}>회원 가입 완료</button>
      {isUsernameTaken && <p>중복된 아이디입니다.</p>}    
      {isSignUpSuccess && <p>회원가입이 완료되었습니다.</p>}
    </div>
  );
};

export default SignUp;
