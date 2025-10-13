import React, { useState } from "react";
import styled from "styled-components";
import mainPageImg from "@/assets/img/1_mainpage.png";
import surveyPageImg from "@/assets/img/2_surveypage.png";
import chartPageImg from "@/assets/img/3_chartpage.png";
import myPageImg from "@/assets/img/4_mypage.png";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const SectionTitle = styled.h3`
  color: #444;
  margin: 25px 0 15px 0;
  font-size: 20px;
`;

const SubTitle = styled.h4`
  color: #555;
  margin: 20px 0 10px 0;
  font-size: 16px;
`;

const Paragraph = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const List = styled.ul`
  color: #666;
  line-height: 1.6;
  margin: 10px 0 15px 20px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const TestScenarioCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ScenarioImage = styled.img`
  width: 500px;
  height: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
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

const MetricBadge = styled.span`
  background-color: #649eff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 4px;
  display: inline-block;
`;


const ABTestScenariosViewer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>

        <Title>테스트 시나리오</Title>

        <Paragraph>
          더 나은 서비스를 제공하기 위해 실제 사용자분들과 함께 진행하는 개선
          테스트입니다. 여러분의 소중한 참여를 통해 더욱 편리하고 만족스러운
          경험을 만들어가고자 합니다.
        </Paragraph>

        <SectionTitle>테스트 개요</SectionTitle>
        <Paragraph>
          사용자분들께서 더 편리하게 이용하실 수 있도록 웹사이트의 주요
          페이지들을 개선하고 있습니다. 총 5가지 페이지에서 사용자 경험과
          접근성을 테스트하여 더 나은 서비스를 제공하겠습니다.
        </Paragraph>

        <SectionTitle>주요 테스트 시나리오</SectionTitle>

        <TestScenarioCard>
          <ScenarioContent>
            <SubTitle>1. 메인 페이지</SubTitle>
            <Paragraph>
              <strong>테스트 목표:</strong> 메인 페이지의 직관성 평가
              <br />
              <strong>테스트 내용:</strong> 정보 배치의 명확성 + 기능 찾기의
              용이성 + 전체적인 구성의 이해도
            </Paragraph>
            <div>
              <MetricBadge>페이지 이해도</MetricBadge>
              <MetricBadge>기능 접근성</MetricBadge>
              <MetricBadge>사용 편의성</MetricBadge>
            </div>
          </ScenarioContent>
          <ScenarioImage src={mainPageImg} alt="메인 페이지 스크린샷" />
        </TestScenarioCard>

        <TestScenarioCard>
          <ScenarioContent>
            <SubTitle>2. 설문조사 페이지</SubTitle>
            <Paragraph>
              <strong>테스트 목표:</strong> 설문조사 접근성 및 탐색 편의성 평가
              <br />
              <strong>테스트 내용:</strong> 여러 설문 간 이동의 편리함 + 설문 정보 확인 + 참여 과정의 직관성
            </Paragraph>
            <div>
              <MetricBadge>탐색 편의성</MetricBadge>
              <MetricBadge>정보 명확성</MetricBadge>
              <MetricBadge>참여 용이성</MetricBadge>
            </div>
          </ScenarioContent>
          <ScenarioImage src={surveyPageImg} alt="설문조사 페이지 스크린샷" />
        </TestScenarioCard>

        <TestScenarioCard>
          <ScenarioContent>
            <SubTitle>3. 차트 페이지</SubTitle>
            <Paragraph>
              <strong>테스트 목표:</strong> 차트 의미 전달력과 그래프 직관성 평가
              <br />
              <strong>테스트 내용:</strong> 차트 정보의 명확성 + 그래프 이해도 +
              데이터 해석의 용이성
            </Paragraph>
            <div>
              <MetricBadge>차트 이해도</MetricBadge>
              <MetricBadge>정보 전달력</MetricBadge>
              <MetricBadge>시각적 만족도</MetricBadge>
            </div>
          </ScenarioContent>
          <ScenarioImage src={chartPageImg} alt="차트 페이지 스크린샷" />
        </TestScenarioCard>

        <TestScenarioCard>
          <ScenarioContent>
            <SubTitle>4. 마이페이지</SubTitle>
            <Paragraph>
              <strong>테스트 목표:</strong> 개인 설문 관리 기능의 직관성 평가
              <br />
              <strong>테스트 내용:</strong> 참여 설문 표시 명확성 + 설문 등록
              편의성 + 등록된 설문 UI 직관성
            </Paragraph>
            <div>
              <MetricBadge>기능 직관성</MetricBadge>
              <MetricBadge>등록 편의성</MetricBadge>
              <MetricBadge>관리 용이성</MetricBadge>
            </div>
          </ScenarioContent>
          <ScenarioImage src={myPageImg} alt="마이페이지 스크린샷" />
        </TestScenarioCard>

        <TestScenarioCard>
          <SubTitle>5. 전반적인 검토</SubTitle>
          <ScenarioContent>
            <Paragraph>
              <strong>테스트 목표:</strong> 전체 서비스 UI/UX 종합 평가
              <br />
              <strong>테스트 내용:</strong> 전반적인 사용성 + 불편한 요소 발견 +
              개선이 필요한 부분 식별
            </Paragraph>
            <div>
              <MetricBadge>전체 만족도</MetricBadge>
              <MetricBadge>사용성 평가</MetricBadge>
              <MetricBadge>개선 필요도</MetricBadge>
            </div>
          </ScenarioContent>
        </TestScenarioCard>

        <SectionTitle>테스트 참여 방법</SectionTitle>
        <List>
          <ListItem>
            <strong>자동 참여:</strong> 사이트를 이용하시면 자동으로 테스트에
            참여됩니다.
          </ListItem>
          <ListItem>
            <strong>테스트 기간:</strong> 테스트는 9월 30일까지 진행됩니다.
          </ListItem>
          <ListItem>
            <strong>보상:</strong> 참여해주신 분들 중 상위 랭킹에 해당하는
            사용자분들께 소정의 상품을 드립니다.
          </ListItem>
          <ListItem>
            <strong>결과 공유:</strong> 테스트 완료 후 개선사항을 모든
            사용자에게 적용합니다.
          </ListItem>
        </List>

        <SectionTitle>진행 단계</SectionTitle>
        <List>
          <ListItem>
            <strong>1단계:</strong> 메인 페이지 및 설문조사 페이지 사용성 테스트
          </ListItem>
          <ListItem>
            <strong>2단계:</strong> 차트 페이지 직관성 테스트
          </ListItem>
          <ListItem>
            <strong>3단계:</strong> 마이페이지 기능성 및 편의성 테스트
          </ListItem>
          <ListItem>
            <strong>4단계:</strong> 전반적인 UI/UX 종합 검토 및 개선사항 도출
          </ListItem>
        </List>

        <SectionTitle>
          여러분의 참여가 연구자분들에게 큰 도움이 됩니다
        </SectionTitle>
        <Paragraph>
          실제 사용자분들의 이용 패턴과 피드백을 통해 더 나은 서비스를 만들 수
          있습니다. 각각의 작은 개선사항들이 모여 전체적인 사용자 경험의 질을
          높이게 됩니다.
        </Paragraph>

        <Paragraph
          style={{
            marginTop: "30px",
            fontSize: "14px",
            color: "#888",
            textAlign: "center",
          }}
        >
          🙏 여러분의 소중한 참여로 더욱 편리하고 만족스러운 서비스를
          만들어가겠습니다.
        </Paragraph>
      </ModalContent>
    </Modal>
  );
};

export default ABTestScenariosViewer;
