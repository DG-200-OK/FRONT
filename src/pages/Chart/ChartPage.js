import React, { useState } from "react";
import CommonHeader from "@/components/CommonHeader";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #f8f9fa;
  padding-top: 60px;
  min-height: 100vh;
`;

const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  padding: 24px;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  width: 200px;
  margin-bottom: 20px;
`;

function ChartPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  return (
    <>
      <CommonHeader />
      <PageWrapper>
        <PageLayout>
          <Sidebar
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          <div>
            <SearchInput
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MainContent
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </div>
        </PageLayout>
      </PageWrapper>
    </>
  );
}

export default ChartPage;
