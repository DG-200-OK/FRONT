import React from "react";
import { NavLink,useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "@/assets/img/logo.png";

const HeaderContainer = styled.header`
  width: 100%;
  height: 44px;
  padding: 16px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  min-width: 320px;
`;

const NavButtons = styled.nav`
  display: flex;
  gap: 80px;
`;

const NavButton = styled(NavLink)`
  padding: 10px 15px;
  font-size: 15px;
  text-decoration: none;
  font-weight: regular;
  color: black;
  background-color: white;
  border: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;

  &:hover {
    color: #4a82d9;
  }

  &:hover::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #a5c8ff;
    border-radius: 2px;
  }

  &.active {
      font-weight: bold;
    color: #4a82d9;
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #a5c8ff;
    border-radius: 2px;
  }
`;

const LogoWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const LogoImageStyled = styled.img`
  height: 35px;
`;

const LoginButton = styled(NavLink)`
  padding: 6px 20px;
  border: 1px solid #68a0f4;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  background-color: white;
  text-decoration: none;

  &:hover {
    background-color: #f0f6ff;
  }
`;

const LogoutButton = styled.button`
  padding: 6px 20px;
  border: 1px solid #68a0f4;
  border-radius: 999px;
  font-weight: 600;
  font-size: 12px;
  color: #000;
  background-color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #f0f6ff;
  }
`;

const LoginWrapper = styled.div`
  padding: 10px 10px;
  justify-content: flex-end;
  flex-shrink: 0;
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRanking = location.pathname.startsWith("/ranking");
  const isMypage = location.pathname.startsWith("/mypage");

  const isLoggedIn = !!localStorage.getItem('user_id');

  const handleLogout = () => {
    if (window.confirm('로그아웃을 하시겠습니까?')) {
      localStorage.removeItem('user_id');
      navigate('/login');
    }
  };

  return (
    <HeaderContainer>
      <LogoWrapper to="/mainpage">
        <LogoImageStyled src={LogoImage} alt="로고" />
      </LogoWrapper>

      <NavButtons>
        <NavButton to="/survey">
          진행 중인 설문조사
        </NavButton>
        <NavButton
          to="/ranking/weekly"
          className={isRanking ? "active" : undefined}
        >
          랭킹 조회
        </NavButton>
        <NavButton
          to="/mypage"
          className={isMypage ? "active" : undefined}
        >
          마이 페이지
        </NavButton>
      </NavButtons>

      <LoginWrapper>
        {isLoggedIn ? (
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        ) : (
          <LoginButton to="/login">로그인</LoginButton>
        )}
      </LoginWrapper>
    </HeaderContainer>
  );
};

export default Header;