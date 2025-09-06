import React from "react";
import styled from "styled-components";
import Header from "@/components/AdminHeader";
import surveyData from "@/data/SurveyData";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 100px 40px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #666;
  margin-bottom: 30px;
`;

const StatItem = styled.div`
  background: #fff;
  padding: 20px 25px;
  margin-bottom: 20px;
  border-left: 6px solid #649eff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const CategoryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const Count = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

const ItemList = styled.ul`
  list-style: disc;
  padding-left: 20px;
`;

const Item = styled.li`
  font-size: 14px;
  color: #444;
  margin-bottom: 4px;
`;

const BackButton = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #4a82d9;
  }
`;

const CategoryStatisticsPage = () => {
  const categoryMap = {};
  const navigate = useNavigate();

  surveyData.forEach((item) => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = [];
    }
    categoryMap[item.category].push(item);
  });

  return (
    <>
      <Header />
      <Container>
        <Title>카테고리별 설문 통계</Title>
        <Subtitle>
          설문 항목들은 음식(cuisine), 의복(clothes), 건축(architecture) 등의
          문화 카테고리로 분류되어 있으며, 각 카테고리별 항목 수를 확인할 수
          있습니다.
        </Subtitle>

        {Object.entries(categoryMap).map(([category, items]) => (
          <StatItem key={category}>
            <CategoryTitle>📂 {category}</CategoryTitle>
            <Count>총 설문 수: {items.length}개</Count>
            <ItemList>
              {items.map((s) => (
                <Item key={s._id}>{s.entityName || s.title}</Item>
              ))}
            </ItemList>
          </StatItem>
        ))}

        <BackButton onClick={() => navigate(-1)}>
          ← 목록으로 돌아가기
        </BackButton>
      </Container>
    </>
  );
};

export default CategoryStatisticsPage;
