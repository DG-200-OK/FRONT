import React from "react";
import styled from "styled-components";
import mainPageImg1 from "@/assets/img/1_mainpage.png";
import mainPageImg2 from "@/assets/img/2_mainpage.png";
import mainPageImg3 from "@/assets/img/3_mainpage.png";

// ✅ 모달 배경
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// ✅ 모달 내부 컨텐츠
const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 18px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 12px 35px rgba(255, 132, 77, 0.25);
  animation: fadeInUp 0.5s ease;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(25px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
  }
`;

// 닫기 버튼
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #ff9b6a;
  transition: color 0.3s ease;

  &:hover {
    color: #ff7043;
  }
`;

// ✅ 제목
const Title = styled.h2`
  background: linear-gradient(135deg, #ff9b6a 0%, #ff7043 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 30px;
  animation: fadeIn 0.8s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Paragraph = styled.p`
  color: #4a4a4a;
  line-height: 1.7;
  margin-bottom: 15px;
  font-size: 16px;
`;

const TestScenarioCard = styled.div`
  border: 1px solid #ffe0d2;
  border-radius: 16px;
  padding: 25px;
  margin: 25px 0;
  background-color: #ffffff;
  box-shadow: 0 4px 15px rgba(255, 132, 77, 0.15);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(255, 112, 67, 0.35);
    background: linear-gradient(135deg, #fff8f3 0%, #ffffff 100%);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 이미지 스타일
const ScenarioImage = styled.img`
  width: 480px;
  height: auto;
  border-radius: 12px;
  border: 1px solid #ffcbb0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
  }
`;

const ScenarioContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

// ✅ 단계 번호 스타일
const StepNumber = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #ff9b6a 0%, #ff7043 100%);
  color: white;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 8px;
  margin-right: 8px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(255, 112, 67, 0.4);
`;

const SurveyTutorialGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <Title>🤖 AI 평가 방법</Title>

        {/* ✅ Score A */}
        <TestScenarioCard>
          <ScenarioContent>
            <Paragraph>
              <StepNumber>1️</StepNumber>
              <strong>Score A (풍부함 기반 평가)</strong>
              <br />
              <br />
              <strong>목적:</strong> 이미지가 얼마나 풍부하고 세밀하게 묘사되었는지 정량화.
              <br />
              <strong>훈련 방식:</strong> LoRA, 지식 증류, 랭킹 손실을 활용해 캡션의 풍부함
              순위를 학습하며, 학습된 모델이 이미지–캡션 벡터의 코사인 유사도를 계산해 점수를 부여.
            </Paragraph>
          </ScenarioContent>
          <ScenarioImage src={mainPageImg1} alt="Score A 평가" />
        </TestScenarioCard>

        {/* ✅ Score B */}
        <TestScenarioCard>
          <ScenarioContent>
            <Paragraph>
              <StepNumber>2️</StepNumber>
              <strong>Score B (사실성 기반 평가)</strong>
              <br />
              <br />
              <strong>목적:</strong> 캡션이 이미지에 없는 내용(환각)을 포함하거나
              핵심 객체를 누락했는지 검증.
              <br />
              <strong>평가 방식:</strong> DETR 모델로 이미지 객체를 추출하고,
              Kiwi로 캡션 명사·속성을 분석한 뒤,
              BLIP VQA 모델로 두 정보를 교차 검증하여 환각·누락 정도를 산출.
            </Paragraph>
          </ScenarioContent>
          <ScenarioImage src={mainPageImg2} alt="Score B 평가" />
        </TestScenarioCard>

        {/* ✅ 평가 흐름 */}
        <TestScenarioCard>
          <ScenarioContent>
            <Paragraph>
              <StepNumber>3️</StepNumber>
              <strong>평가 흐름</strong>
              <br />
              <br />
              사용자가 제출한 이미지–캡션 데이터셋을 입력하면
              <br />
              Score A(풍부함)과 Score B(사실성) 평가가 <strong>동시에 진행</strong>되어
              <br />
              각각의 점수가 자동으로 산출된다.
            </Paragraph>
          </ScenarioContent>
          <ScenarioImage src={mainPageImg3} alt="평가 흐름" />
        </TestScenarioCard>

        <Paragraph
          style={{
            marginTop: "30px",
            fontSize: "14px",
            color: "#ff8b5c",
            textAlign: "center",
          }}
        >
          ※ 두 평가 결과는 종합되어 최종 AI 평가 점수로 반영됩니다.
        </Paragraph>
      </ModalContent>
    </Modal>
  );
};

export default SurveyTutorialGuide;
