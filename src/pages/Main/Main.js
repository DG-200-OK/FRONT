import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import BannerImg from "@/assets/img/banner_1.svg";
import Header from "@/components/CommonHeader";
import SurveyTutorialGuide from "@/components/SurveyTutorialGuide";
import ABTestScenariosViewer from "@/components/ABTestScenariosViewer";
import MobileRestriction from "@/components/MobileRestriction";

/* ✅ 전역 스타일 */
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: clip;
    width: 100%;
    background-color: #fff;
  }

  * {
    box-sizing: border-box;
  }
`;

/* ✅ 전체 컨테이너 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
  box-sizing: border-box;
`;

const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  background: #ffffff;
  overflow: hidden;
`;

const BearImage = styled.img`
  width: 95%;
  height: 95%;

  @media (max-width: 768px) {
    width: 280px;
  }
`;

const TutorialSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 60px 40px;
  margin: -100px auto 0;
  position: relative;
  z-index: 10;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 40px 20px;
    margin: -50px auto 0;
  }
`;

const TutorialTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const TutorialSubtitle = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-bottom: 50px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const TutorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const TutorialCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => {
      if (props.type === "survey")
        return "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)";
      return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
    }};
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 25px;
  text-align: center;
`;

const CardButton = styled.button`
  width: 100%;
  padding: 15px 25px;
  background: ${(props) => {
    if (props.type === "survey")
      return "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)";
    return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
  }};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px
      ${(props) => {
        if (props.type === "survey") return "rgba(255, 107, 107, 0.4)";
        return "rgba(79, 172, 254, 0.4)";
      }};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Main = () => {
  const [showSurveyTutorial, setShowSurveyTutorial] = useState(false);
  const [showABTestModal, setShowABTestModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileKeywords = [
        "Mobile",
        "Android",
        "iPhone",
        "iPad",
        "iPod",
        "BlackBerry",
        "Windows Phone",
      ];
      const isMobileDevice = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
      );
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStartDataEvaluation = () => {
    window.location.href = "/survey";
  };

  if (isMobile) {
    return <MobileRestriction />;
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <HeroSection>
          <BearImage src={BannerImg} alt="돋보기를 든 곰돌이" />
        </HeroSection>

        <TutorialSection>
          <TutorialTitle>📚 웹크롤링 & AI </TutorialTitle>
          <TutorialSubtitle>
            저희 사이트에서 사용하는 웹크롤링 방법과 AI 평가 방법에 대해 자세히 알아봐요
          </TutorialSubtitle>

          <TutorialGrid>
            {/* 🔹 웹크롤링 방법 카드 */}
            <TutorialCard type="test">
              <CardIcon>💻</CardIcon>
              <CardTitle>웹크롤링 방법</CardTitle>
              <CardDescription>
                웹크롤링이 어떠한 방법으로 진행되는지 자세하게 알아보세요
              </CardDescription>
              <CardButton type="test" onClick={() => setShowABTestModal(true)}>
                웹크롤링 방법 확인하기
              </CardButton>
            </TutorialCard>

            {/* 🔹 AI 평가 튜토리얼 카드 */}
            <TutorialCard type="survey">
              <CardIcon>📋</CardIcon>
              <CardTitle>AI 평가 과정</CardTitle>
              <CardDescription>
                AI 모델의 평가 방식(Score A & Score B 기반)에 대해 알아보세요
              </CardDescription>
              <CardButton
                type="survey"
                onClick={() => setShowSurveyTutorial(true)}
              >
                평가 방법 알아보기
              </CardButton>
            </TutorialCard>
          </TutorialGrid>
        </TutorialSection>

        <SurveyTutorialGuide
          isOpen={showSurveyTutorial}
          onClose={() => setShowSurveyTutorial(false)}
          onStartDataEvaluation={handleStartDataEvaluation}
        />
        <ABTestScenariosViewer
          isOpen={showABTestModal}
          onClose={() => setShowABTestModal(false)}
        />
      </Container>
    </>
  );
};

export default Main;
