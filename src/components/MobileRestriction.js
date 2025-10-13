import React, { useState } from "react";
import styled from "styled-components";
import SurveyTutorialGuide from "@/components/SurveyTutorialGuide";
import ABTestScenariosViewer from "@/components/ABTestScenariosViewer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`;

const Card = styled.div`
  background: white;
  color: #333;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  margin-bottom: 30px;
`;

const Icon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
`;

const TutorialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const TutorialButton = styled.button`
  padding: 15px 25px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => {
    if (props.type === "main") return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    if (props.type === "survey") return "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)";
    return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
  }};
  color: white;

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

const PcIcon = styled.div`
  margin-top: 30px;
  font-size: 60px;
  opacity: 0.8;
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
  padding: 30px;
  max-width: 90%;
  width: 400px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;

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
  margin-bottom: 25px;
`;

const ModalTitle = styled.h2`
  color: #333;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ModalSubtitle = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

const ModalBody = styled.div`
  line-height: 1.6;
  color: #444;
  margin-bottom: 25px;
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
  padding: 15px;
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
  padding: 12px;
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

const MobileRestriction = () => {
  const [showSurveyTutorial, setShowSurveyTutorial] = useState(false);
  const [showABTestModal, setShowABTestModal] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  const handleStartDataEvaluation = () => {
    // 모바일에서는 실제 페이지로 이동하지 않음
    alert("PC 환경에서 이용해주세요!");
  };

  return (
    <>
      <Container>
        <Card>
          <Icon>📱</Icon>
          <Title>PC 환경 이용 권장</Title>
          <Description>
            본 플랫폼은 웹 기반으로 제작되어 PC 환경에서 최적화되어 있습니다.
            <br /><br />
            더 나은 사용자 경험을 위해 PC나 태블릿으로 접속해주세요.
          </Description>

          <Description style={{ fontSize: '14px', color: '#888' }}>
            아래 튜토리얼을 통해 플랫폼 기능을 미리 확인해보실 수 있습니다.
          </Description>

          <TutorialButtonsContainer>
            <TutorialButton
              type="survey"
              onClick={() => setShowSurveyTutorial(true)}
            >
              📋 설문 평가 튜토리얼
            </TutorialButton>

            <TutorialButton
              type="test"
              onClick={() => setShowABTestModal(true)}
            >
              🔬 테스트 시나리오
            </TutorialButton>

            <TutorialButton
              type="main"
              onClick={() => setIsRewardModalOpen(true)}
            >
              🎁 참여 보상 및 점수 안내
            </TutorialButton>
          </TutorialButtonsContainer>
        </Card>

        <PcIcon>💻</PcIcon>

        <Description style={{ color: 'rgba(255, 255, 255, 0.8)', marginTop: '20px' }}>
          PC 환경에서 다시 접속해주시면 전체 기능을 이용하실 수 있습니다.
        </Description>
      </Container>

      {/* 튜토리얼 모달들 */}
      <SurveyTutorialGuide
        isOpen={showSurveyTutorial}
        onClose={() => setShowSurveyTutorial(false)}
        onStartDataEvaluation={handleStartDataEvaluation}
      />

      <ABTestScenariosViewer
        isOpen={showABTestModal}
        onClose={() => setShowABTestModal(false)}
      />

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
                <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>
                  📊 점수 적립 방식
                </h4>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
                  데이터 평가를 진행하면 <HighlightText>한 캡션 문항마다 1점</HighlightText>을 얻을 수 있습니다.
                </p>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                  더 많은 평가에 참여할수록 더 높은 점수를 획득하실 수 있습니다.
                </p>
                <p style={{ margin: '0', color: '#e74c3c', fontSize: '12px' }}>
                  ⚠️ 불성실한 데이터(패턴이 의심되는 응답 등)는 필터링되어 점수에서 제외됩니다.
                </p>
              </ModalSection>

              <ModalSection>
                <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>
                  🏆 참여 보상
                </h4>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
                  상위권 점수의 참가자분들께는 <HighlightText>만원 상당의 참여 보상</HighlightText>을 드립니다.
                </p>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                  9월 30일까지 적극적인 참여로 순위를 올려보세요!
                </p>
              </ModalSection>

              <ModalSection>
                <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>
                  📝 보상 지급 절차
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                  보상을 위해서 <HighlightText>추가적인 피드백 구글 폼</HighlightText>이 이메일로 발송됩니다.
                </p>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
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

export default MobileRestriction;