import React from 'react';

const HomePage = ({ userName, onLogout }) => {
  return (
    <div>
      <h2>홈 페이지</h2>
      {userName ? ( <p>{userName} 님 환영합니다.</p>) : (<p>Welcome!</p>)}
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
};

export default HomePage;
