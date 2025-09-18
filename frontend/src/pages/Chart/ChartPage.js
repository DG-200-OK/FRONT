import React from "react";
import CommonHeader from "@/components/CommonHeader";
import MainContent from "./MainContent";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #f8f9fa;
  padding-top: 60px;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  padding: 24px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

function ChartPage() {
  return (
    <>
      <CommonHeader />
      <PageWrapper>
        <ContentWrapper>
          <MainContent />
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default ChartPage;
