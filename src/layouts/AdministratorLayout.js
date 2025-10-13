import React from "react";
import Header from "@/components/AdministratorHeader";
import AdministratorSidebar from "@/components/AdministratorSidebar";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 40px;
  margin-top: 70px;
  margin-left: 240px;  /* ✅ 사이드바 공간 확보 */
  box-sizing: border-box;
  overflow-x: hidden;  /* ✅ 가로 스크롤 제거 */
`;

const AdministratorLayout = ({ children }) => {
  return (
    <>
      <Header />
      <LayoutWrapper>
        <AdministratorSidebar />
        <ContentWrapper>{children}</ContentWrapper>
      </LayoutWrapper>
    </>
  );
};

export default AdministratorLayout;
