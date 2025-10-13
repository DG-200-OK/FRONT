import React from "react";
import styled from "styled-components";
import dataSelectImg from "@/assets/img/1_dataselect.png";
import evaluationMetricImg from "@/assets/img/2_evaluation_metric.png";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  max-width: 1200px;
  width: 95%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease-out;
  max-height: 90vh;
  overflow-y: auto;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
    margin: 10px;
    max-width: 95%;
    max-height: 95vh;
    border-radius: 15px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s ease;

  &:hover {
    color: #666;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 15px;
  font-size: 28px;
  text-align: center;
  font-weight: bold;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 30px;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin: 30px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StepCard = styled.div`
  display: flex;
  flex-direction: ${(props) => props.step === 2 ? "column" : "row"};
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  flex: 1;
  background: ${(props) => {
    if (props.step === 1) return "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)";
    if (props.step === 2) return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  }};
  color: white;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    gap: 15px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover::after {
    left: 100%;
  }
`;

const StepNumber = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepImage = styled.img`
  width: ${(props) => props.step === 2 ? "100%" : "220px"};
  max-width: ${(props) => props.step === 2 ? "450px" : "220px"};
  height: auto;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepBottomRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
`;

const StepDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.95;
  margin: 0;
`;

const ActionContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
  color: white;
  border: none;
  padding: 15px 35px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);

  &:hover {
    background: linear-gradient(135deg, #ff5252 0%, #ff7043 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SkipText = styled.p`
  color: #999;
  font-size: 12px;
  margin-top: 15px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #666;
  }
`;

const SurveyTutorialGuide = ({ isOpen, onClose, onStartDataEvaluation }) => {
  if (!isOpen) return null;

  const handleStartClick = () => {
    onStartDataEvaluation();
    onClose();
  };

  const handleSkipClick = () => {
    onClose();
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleSkipClick}>&times;</CloseButton>

        <Title>📋 설문 평가 가이드</Title>

        <Subtitle>
          설문 평가를 처음 시작하시는군요! 간단한 2단계로 설문 평가 방법을 안내해드릴게요.
        </Subtitle>

        <StepsContainer>
          <StepCard step={1}>
            <StepNumber>1</StepNumber>
            <StepImage src={dataSelectImg} alt="데이터 선택 예시" />
            <StepContent>
              <StepTitle>🎯 데이터 선택</StepTitle>
              <StepDescription>
                설문 목록에서 관심있는 주제나 카테고리의 설문조사를 선택하세요.
                각 설문은 주제별로 분류되어 있고 필터, 검색 기능을 통해 원하는 데이터를 쉽게 찾을 수 있습니다.
              </StepDescription>
            </StepContent>
          </StepCard>

          <StepCard step={2}>
            <StepImage src={evaluationMetricImg} alt="평가 지표 예시" step={2} />
            <StepBottomRow>
              <StepNumber>2</StepNumber>
              <StepContent>
                <StepTitle>📊 세 지표 평가</StepTitle>
                <StepDescription>
                  각 캡션마다 세 가지 평가 지표가 있습니다.
                  본인의 생각과 판단에 따라 슬라이드 바를 조정하여 점수를 매겨주세요.
                  정답은 없으니 자유롭게 평가하시면 됩니다.
                </StepDescription>
              </StepContent>
            </StepBottomRow>
          </StepCard>

        </StepsContainer>

        <ActionContainer>
          <StartButton onClick={handleStartClick}>
            🚀 설문 평가 시작하기
          </StartButton>
          <SkipText onClick={handleSkipClick}>나중에 둘러보기</SkipText>
        </ActionContainer>
      </ModalContent>
    </Modal>
  );
};

export default SurveyTutorialGuide;