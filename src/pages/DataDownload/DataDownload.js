import React, { useState } from "react";
import styled from "styled-components";
import SurveypageLayout from "@/layouts/DataDownloadLayout";

const DataDownload = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <SurveypageLayout
      selectedCountries={selectedCountries}
      handleCountryChange={(country) => {
        setSelectedCountries((prev) =>
          prev.includes(country)
            ? prev.filter((c) => c !== country)
            : [...prev, country]
        );
      }}
      selectedCategories={selectedCategories}
      handleCategoryChange={(category) => {
        setSelectedCategories((prev) =>
          prev.includes(category) ? [] : [category]
        );
      }}
    >
      <Content>
        <Title>데이터 다운로드</Title>
        <p>선택한 카테고리와 국가에 대한 데이터를 다운로드할 수 있습니다.</p>

        <DownloadSection>
          <ItemBox>
            <ImageBox>이미지</ImageBox>
            <ItemContent>
              <ItemTitle>Architecture &gt; 한국</ItemTitle>
              <ItemSubText>전체 데이터 수 : 100</ItemSubText>
            </ItemContent>
            <DownloadButton>다운로드</DownloadButton>
          </ItemBox>

          <ItemBox>
            <ImageBox>이미지</ImageBox>
            <ItemContent>
              <ItemTitle>Clothing &gt; 한국</ItemTitle>
              <ItemSubText>전체 데이터 수 : 100</ItemSubText>
            </ItemContent>
            <DownloadButton>다운로드</DownloadButton>
          </ItemBox>
        </DownloadSection>
      </Content>
    </SurveypageLayout>
  );
};

export default DataDownload;

// ✅ 스타일 정의
const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const DownloadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px 20px;
  justify-content: space-between;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #777;
  margin-right: 20px;
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ItemSubText = styled.span`
  font-size: 13px;
  color: #888;
`;

const DownloadButton = styled.button`
  padding: 8px 16px;
  background-color: #649eff;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #4a82d9;
  }
`;
