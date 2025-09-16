import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MypageLayout from "@/layouts/MypageLayout";
import axiosInstance from "@/axiosInstance";

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  font-size: 14px;
  min-height: 600px;
  margin-bottom: 20px;
`;

const SurveyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SurveyCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fefefe;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    border-color: #4a82d9;
    box-shadow: 0 6px 12px rgba(74, 130, 217, 0.2);
    transform: translateY(-3px);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: #eaeaea;
`;

const CardInfo = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EntityName = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 0;
`;

const MetaInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ResponseButton = styled.div`
  margin-top: auto;
  padding: 12px 16px;
  background-color: #e8edff;
  font-size: 14px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  gap: 4px;
  transition: background-color 0.2s;

  span:first-child {
    font-weight: bold;
    color: #4a82d9;
  }

  span:last-child {
    font-weight: normal;
    color: #555;
  }

  &:hover {
    background-color: #d4e1ff;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AdminListPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const countries = ["한국", "중국", "일본"];
  const categories = ["Architecture", "Cuisine", "Tool", "Clothes", "Game"];
  const statuses = ["approved", "pending", "rejected"];

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await axiosInstance.get("/api/surveys/register", {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          withCredentials: true,
        });

        const list = Array.isArray(res.data?.responseData)
          ? res.data.responseData
          : Array.isArray(res.data)
          ? res.data
          : [];

        setSurveys(list);
        setFilteredSurveys(list);
      } catch (err) {
        console.error("설문 목록 불러오기 실패:", err);
        setSurveys([]);
        setFilteredSurveys([]);
      }
    };

    fetchSurveys();
  }, []);

  const handleCountryChange = (e) => setSelectedCountry(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  useEffect(() => {
    const base = Array.isArray(surveys) ? surveys : [];

    let filtered = base;

    if (selectedCountry) {
      filtered = filtered.filter((s) => (s?.country ?? "") === selectedCountry);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (s) => (s?.category ?? "") === selectedCategory
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter((s) => s?.status === selectedStatus);
    }

    setFilteredSurveys(filtered);
  }, [selectedCountry, selectedCategory, selectedStatus, surveys]);

  return (
    <MypageLayout>
      <Content>
        <TitleWrapper>
          <SectionTitle>내 설문 목록</SectionTitle>

          <SelectWrapper>
            <div>
              <label htmlFor="country">나라 선택:</label>
              <Select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                <option value="">전체</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label htmlFor="category">카테고리 선택:</label>
              <Select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">전체</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label htmlFor="status">승인 상태:</label>
              <Select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">전체</option>
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st === "approved"
                      ? "승인됨"
                      : st === "pending"
                      ? "대기 중"
                      : "거절됨"}
                  </option>
                ))}
              </Select>
            </div>
          </SelectWrapper>
        </TitleWrapper>

        {!Array.isArray(filteredSurveys) || filteredSurveys.length === 0 ? (
          <p>등록한 설문조사가 없습니다.</p>
        ) : (
          <SurveyGrid>
            {filteredSurveys.map(
              ({ surveyId, country, category, title, imageUrl }) => (
                <SurveyCard key={surveyId}>
                  <StyledLink to={`/mypage/survey-creation-detail/${surveyId}`}>
                    <Image src={imageUrl} alt={category} />
                    <CardInfo>
                      <EntityName>{title}</EntityName>
                      <MetaInfo>{`${country}, ${category}`}</MetaInfo>
                    </CardInfo>
                    <ResponseButton>
                      <span>58명</span>
                      <span>응답 보러가기</span>
                    </ResponseButton>
                  </StyledLink>
                </SurveyCard>
              )
            )}
          </SurveyGrid>
        )}
      </Content>
    </MypageLayout>
  );
};

export default AdminListPage;
