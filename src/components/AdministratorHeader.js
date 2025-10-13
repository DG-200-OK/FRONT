import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "@/assets/img/logo.png"; // 로고 이미지 경로 그대로 유지

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  padding: 20px 35px;
  display: flex;
  justify-content: space-between; /* 왼쪽 로고, 오른쪽 로그인 버튼 */
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  min-width: 320px;
`;

const LogoWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  text-decoration: none;
`;

const LogoImageStyled = styled.img`
  height: 45px;
`;

const LoginButton = styled(NavLink)`
  padding: 10px 24px;
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
  padding: 10px 24px;
  border: 1px solid #68a0f4;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  background-color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #f0f6ff;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user_id");

  const handleLogout = () => {
    if (window.confirm("로그아웃을 하시겠습니까?")) {
      localStorage.removeItem("user_id");
      navigate("/login");
    }
  };

  return (
    <HeaderContainer>
      {/* 왼쪽 로고 */}
      <LogoWrapper to="/mainpage">
        <LogoImageStyled src={LogoImage} alt="로고" />
      </LogoWrapper>

      {/* 오른쪽 로그인 / 로그아웃 */}
      {isLoggedIn ? (
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      ) : (
        <LoginButton to="/login">로그인</LoginButton>
      )}
    </HeaderContainer>
  );
};

export default Header;
