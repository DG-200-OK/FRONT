import React from "react";
import styled from "styled-components";
import mainPageImg5 from "@/assets/img/5_mainpage.png";
import mainPageImg6 from "@/assets/img/6_mainpage.png";
import mainPageImg7 from "@/assets/img/7_mainpage.png";
import mainPageImg8 from "@/assets/img/8_mainpage.png";


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
  box-shadow: 0 12px 35px rgba(0, 150, 255, 0.25);
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
  color: #7aa9d1;
  transition: color 0.3s ease;

  &:hover {
    color: #3d8be8;
  }
`;

// ✅ 제목에 하늘색 그라데이션 + 등장 애니메이션
const Title = styled.h2`
  background: linear-gradient(135deg, #6ecbff 0%, #3fa9f5 100%);
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

// ✅ 카드 hover 시 하늘색 라이트 효과
const TestScenarioCard = styled.div`
  border: 1px solid #d4ebff;
  border-radius: 16px;
  padding: 25px;
  margin: 25px 0;
  background-color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 150, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(110, 203, 255, 0.35);
    background: linear-gradient(135deg, #f4fbff 0%, #ffffff 100%);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 이미지 스타일
const ScenarioImage = styled.img`
  width: 500px;
  height: auto;
  border-radius: 12px;
  border: 1px solid #bde2ff;
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

// ✅ 단계 배지 (하늘색 계열)
const StepNumber = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #6ecbff 0%, #3fa9f5 100%);
  color: white;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 8px;
  margin-right: 8px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(64, 187, 255, 0.4);
`;

const ABTestScenariosViewer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <Title>🧩 크롤링 과정 요약</Title>

        <TestScenarioCard>
          <ScenarioContent>
            <Paragraph>
              <StepNumber>1</StepNumber>
              사용자가 입력창에 Seed URL, 카테고리, 이미지 확장자, 검색어를 입력한 뒤
              <br />‘크롤링’ 버튼을 클릭하면 크롤링이 시작됩니다.
            </Paragraph>
          </ScenarioContent>
          <ScenarioImage src={mainPageImg5} alt="메인 페이지 스크린샷" />
        </TestScenarioCard>

        <TestScenarioCard>
          <ScenarioContent>
            <Paragraph>
              <StepNumber>2</StepNumber>
              서버에서 <b>mcp.py</b>가 실행되어 클라이언트 요청을 받아 각 사이트 크롤러를 제어합니다.
            </Paragraph>
          </ScenarioContent>
          <ScenarioImage src={mainPageImg6} alt="서버 구조 이미지" />
        </TestScenarioCard>

        <TestScenarioCard>
          <ScenarioContent>
            <Paragraph>
              <StepNumber>3</StepNumber>
              <b>LLM(GPT-5 Nano)</b>가 Folkency, Encykorea, Wikimedia 등 사이트별 크롤러를 실행해
              <br />image_url, image_src, description 데이터 쌍을 수집합니다.
            </Paragraph>
          </ScenarioContent>
          <ScenarioImage src={mainPageImg7} alt="크롤링 프로세스" />
        </TestScenarioCard>

        <TestScenarioCard>
          <ScenarioContent>
            <Paragraph>
              <StepNumber>4</StepNumber>
              수집된 데이터 중 image_src는 AWS S3에 저장되고,
              <br />image_url과 description은 데이터베이스(DB)에 저장되며 크롤링이 종료됩니다.
            </Paragraph>
          </ScenarioContent>
          <ScenarioImage src={mainPageImg8} alt="데이터 저장 단계" />
        </TestScenarioCard>

        <Paragraph
          style={{
            marginTop: "30px",
            fontSize: "14px",
            color: "#7da9c7",
            textAlign: "center",
          }}
        >
          ※ 모든 과정은 자동화되어 있으며, 오류 발생 시 로그 파일을 통해 확인 가능합니다.
        </Paragraph>
      </ModalContent>
    </Modal>
  );
};

export default ABTestScenariosViewer;
