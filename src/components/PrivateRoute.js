import React from 'react';
import { Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // 로그인 여부 상관없이 항상 통과
  return <Outlet />;
};

export default PrivateRoute;
