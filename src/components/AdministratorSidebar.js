import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 240px; /* ✅ 폭 고정 */
  flex-shrink: 0; /* ✅ 화면 줄어들어도 절대 줄지 않음 */
  padding: 80px 20px 20px 20px;
  border-right: 1px solid #ddd;
  background-color: #f0f8ff; /* 마이페이지와 동일 */
  text-align: center;
  position: fixed; /* ✅ 스크롤해도 고정 (선택) */
  top: 0;
  left: 0;
  height: 100vh; /* ✅ 전체 높이 채우기 */
  box-sizing: border-box;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;

const ButtonGroup = styled.div`
  margin-top: 40px;
`;

const MenuButton = styled(Link)`
  display: block;
  text-align: center;
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 24px;
  color: #333;
  text-decoration: none;
  padding: 10px 0;
  border-radius: 6px;
  transition: 0.2s;

  &:hover {
    color: #649eff;
    background-color: #f0f6ff;
  }

  &.active {
    font-weight: bold;
    color: #4a82d9;
    background-color: #e8f0ff;
  }
`;

const AdministratorSidebar = () => {
  const location = useLocation();

  return (
    <SidebarWrapper>
      <SectionTitle>관리자 페이지</SectionTitle>
      <ButtonGroup>
        <MenuButton
          to="/administrator"
          className={location.pathname === "/administrator" ? "active" : ""}
        >
          대시보드
        </MenuButton>
        <MenuButton
          to="/administrator/crawler"
          className={location.pathname === "/administrator/crawler" ? "active" : ""}
        >
          크롤러
        </MenuButton>
        <MenuButton
          to="/administrator/survey"
          className={location.pathname === "/administrator/survey" ? "active" : ""}
        >
          설문 관리
        </MenuButton>
      </ButtonGroup>
    </SidebarWrapper>
  );
};

export default AdministratorSidebar;
