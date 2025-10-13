import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BannerImg from "@/assets/img/banner_1.svg";
import Header from "@/components/CommonHeader";
import TutorialGuide from "@/components/TutorialGuide";
import SurveyTutorialGuide from "@/components/SurveyTutorialGuide";
import ABTestScenariosViewer from "@/components/ABTestScenariosViewer";
import MobileRestriction from "@/components/MobileRestriction";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding-top: 60px;
  box-sizing: border-box;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 120px 24px 40px;
    flex-direction: column;
    text-align: center;
  }
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;

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
      if (props.type === "main") return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      if (props.type === "survey") return "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)";
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
    if (props.type === "main") return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    if (props.type === "survey") return "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)";
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
    box-shadow: 0 8px 25px ${(props) => {
      if (props.type === "main") return "rgba(102, 126, 234, 0.4)";
      if (props.type === "survey") return "rgba(255, 107, 107, 0.4)";
      return "rgba(79, 172, 254, 0.4)";
    }};
  }

  &:active {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 700px;
  width: 95%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(-50px) scale(0.9);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const ModalTitle = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ModalSubtitle = styled.p`
  color: #666;
  font-size: 16px;
  margin: 0;
`;

const ModalBody = styled.div`
  line-height: 1.8;
  color: #444;
  margin-bottom: 30px;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const HighlightText = styled.span`
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;

const ModalSection = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9ff;
  border-radius: 12px;
  border-left: 4px solid #ffd700;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #666;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ffed4e 0%, #ff9500 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
  }
`;

const Main = () => {
  const [showMainTutorial, setShowMainTutorial] = useState(false);
  const [showSurveyTutorial, setShowSurveyTutorial] = useState(false);
  const [showABTestModal, setShowABTestModal] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileKeywords = ['Mobile', 'Android', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStartDataEvaluation = () => {
    window.location.href = "/survey";
  };

  // 모바일 환경에서는 제한 페이지 표시
  if (isMobile) {
    return <MobileRestriction />;
  }

  return (
    <>
      <Container>
        <Header />

        <HeroSection>
          <BearImage src={BannerImg} alt="돋보기를 든 곰돌이" />
        </HeroSection>

        <TutorialSection>
          <TutorialTitle>📚 가이드 & 튜토리얼</TutorialTitle>
          <TutorialSubtitle>
            테스트 시나리오와 설문 평가 방법 그리고 참여 보상에 대해 자세히 알아보세요.
          </TutorialSubtitle>

          <TutorialGrid>
            <TutorialCard type="test">
              <CardIcon>🔬</CardIcon>
              <CardTitle>테스트 시나리오</CardTitle>
              <CardDescription>
                사용자 경험 개선을 위한 5가지 테스트 시나리오를 확인하고
                각 페이지별 테스트 방법을 알아보세요.
              </CardDescription>
              <CardButton
                type="test"
                onClick={() => setShowABTestModal(true)}
              >
                시나리오 확인하기
              </CardButton>
            </TutorialCard>

            <TutorialCard type="survey">
              <CardIcon>📋</CardIcon>
              <CardTitle>설문 평가 튜토리얼</CardTitle>
              <CardDescription>
                설문 평가 방법을 단계별로 안내합니다. 데이터 선택부터
                세 가지 지표 평가까지 자세히 알아보세요.
              </CardDescription>
              <CardButton
                type="survey"
                onClick={() => setShowSurveyTutorial(true)}
              >
                평가 방법 배우기
              </CardButton>
            </TutorialCard>

            <TutorialCard type="main">
              <CardIcon>🎁</CardIcon>
              <CardTitle>점수 및 참여 보상</CardTitle>
              <CardDescription>
                참여 점수 시스템과 순위별 보상에 대해 자세히 알아보세요.
                설문 참여로 포인트를 얻고 상위 참여자 혜택을 확인하세요.
              </CardDescription>
              <CardButton
                type="main"
                onClick={() => setIsRewardModalOpen(true)}
              >
                보상 정보 보기
              </CardButton>
            </TutorialCard>
          </TutorialGrid>
        </TutorialSection>

        {/* 튜토리얼 모달들 */}
        <TutorialGuide
          isOpen={showMainTutorial}
          onClose={() => setShowMainTutorial(false)}
          onStartDataEvaluation={handleStartDataEvaluation}
        />

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

      {isRewardModalOpen && (
        <ModalOverlay onClick={() => setIsRewardModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setIsRewardModalOpen(false)}>
              ×
            </CloseButton>

            <ModalHeader>
              <ModalTitle>🎁 참여 보상 및 점수 안내</ModalTitle>
              <ModalSubtitle>데이터 평가 참여로 보상을 받아보세요!</ModalSubtitle>
            </ModalHeader>

            <ModalBody>
              <ModalSection>
                <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
                  📊 점수 적립 방식
                </h4>
                <p style={{ margin: '0 0 10px 0' }}>
                  데이터 평가를 진행하면 <HighlightText>한 캡션 문항마다 1점</HighlightText>을 얻을 수 있습니다.
                </p>
                <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                  더 많은 평가에 참여할수록 더 높은 점수를 획득하실 수 있습니다.
                </p>
                <p style={{ margin: '0', color: '#e74c3c', fontSize: '14px' }}>
                  ⚠️ 불성실한 데이터(패턴이 의심되는 응답 등)는 필터링되어 점수에서 제외됩니다.
                </p>
              </ModalSection>

              <ModalSection>
                <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
                  🏆 참여 보상
                </h4>
                <p style={{ margin: '0 0 10px 0' }}>
                  상위권 점수의 참가자분들께는 <HighlightText>만원 상당의 참여 보상</HighlightText>을 드립니다.
                </p>
                <p style={{ margin: '0', color: '#666' }}>
                  9월 30일까지 적극적인 참여로 순위를 올려보세요!
                </p>
              </ModalSection>

              <ModalSection>
                <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
                  📝 보상 지급 절차
                </h4>
                <p style={{ margin: '0 0 8px 0' }}>
                  보상을 위해서 <HighlightText>추가적인 피드백 구글 폼</HighlightText>이 이메일로 발송됩니다.
                </p>
                <p style={{ margin: '0', color: '#666' }}>
                  해당 폼까지 작성을 완료하시면 보상을 지급해 드릴 예정입니다.
                </p>
              </ModalSection>
            </ModalBody>

            <ConfirmButton onClick={() => setIsRewardModalOpen(false)}>
              확인했습니다
            </ConfirmButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Main;