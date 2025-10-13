import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import CommonHeader from "@/components/CommonHeader";
import LazyImage from "@/components/LazyImage";

const SurveyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, image_url, captions, country, category, Key, startIndex } = location.state || {};

  const handleStart = () => {
    const path = `${country} > ${category} > ${title}`;

    const shuffledCaptions = [...captions];
    for (let i = shuffledCaptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCaptions[i], shuffledCaptions[j]] = [shuffledCaptions[j], shuffledCaptions[i]];
    }

    sessionStorage.setItem(`survey_${Key}_captions`, JSON.stringify(shuffledCaptions));
    navigate(`/survey/${title}/start`, {
      state: {
        image: image_url,
        captions: shuffledCaptions, 
        path,
        surveyId: Key,
        startIndex: startIndex || 0,
      },
    });
  };

  return (
    <Wrapper>
      <CommonHeader />
      <Container>
        <LazyImage
          src={image_url}
          alt={title}
          style={{
            width: "380px",
            height: "280px",
            objectFit: "cover",
            borderRadius: "12px"
          }}
        />
        <TextBox>
          <Title>{title}</Title>
          <Description>
            {country} / {category} / {title}
          </Description>
          <StartButton onClick={handleStart}>설문 시작하기</StartButton>
        </TextBox>
      </Container>
    </Wrapper>
  );
};

export default SurveyDetail;

const Wrapper = styled.div`
  height: 100vh;
`;

const Container = styled.div`
  padding: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Image = styled.img`
  width: 380px;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
`;

const StartButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #649eff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #3a6fbd;
  }
`;
