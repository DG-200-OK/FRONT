import React from "react";
import styled from "styled-components";

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
  max-width: 600px;
  width: 90%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease-out;

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
    padding: 30px 25px;
    margin: 20px;
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
  margin-bottom: 25px;
  font-size: 28px;
  text-align: center;
  font-weight: bold;
`;

const WelcomeText = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 30px;
`;

const FeatureContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const FeatureCard = styled.div`
  flex: 1;
  padding: 25px;
  background: ${(props) =>
    props.primary
      ? "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)"
      : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"};
  color: white;
  border-radius: 15px;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: ${(props) => (props.primary ? "pointer" : "default")};
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px
    ${(props) =>
      props.primary ? "rgba(255, 107, 107, 0.3)" : "rgba(79, 172, 254, 0.3)"};

  ${(props) =>
    props.primary &&
    `
    animation: pulse 2s infinite;

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
      }
      50% {
        transform: scale(1.03);
        box-shadow: 0 12px 30px rgba(255, 107, 107, 0.5);
      }
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 35px rgba(255, 107, 107, 0.6);
    }
  `}

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

const FeatureIcon = styled.div`
  font-size: 32px;
  margin-bottom: 15px;
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  opacity: 0.9;
`;

const ActionContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 35px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
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

const TutorialGuide = ({ isOpen, onClose, onStartDataEvaluation }) => {
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

        <Title>🎉 환영합니다!</Title>

        <WelcomeText>
          테스트를 참가해주셔서 감사합니다! 저희 플랫폼의 주요 기능을
          소개해드릴게요.
        </WelcomeText>

        <FeatureContainer>
          <FeatureCard primary onClick={handleStartClick}>
            <FeatureIcon>✨</FeatureIcon>
            <FeatureTitle>데이터 평가</FeatureTitle>
            <FeatureDescription>
              다양한 설문조사에 참여하여
              <br />
              데이터를 평가하고 의견을 남겨보세요!
              <br />
              <strong>👆 클릭해서 시작하기</strong>
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>차트 조회</FeatureTitle>
            <FeatureDescription>
              참여한 설문조사의 결과를
              <br />
              다양한 차트로 확인할 수 있어요!
            </FeatureDescription>
          </FeatureCard>
        </FeatureContainer>

        <ActionContainer>
          <StartButton onClick={handleStartClick}>
            🚀 데이터 평가 시작하기
          </StartButton>
          <SkipText onClick={handleSkipClick}>나중에 둘러보기</SkipText>
        </ActionContainer>
      </ModalContent>
    </Modal>
  );
};

export default TutorialGuide;
