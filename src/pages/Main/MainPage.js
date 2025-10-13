import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "@/components/CommonHeader";
import axiosInstance from "@/axiosInstance";
import LazyImage from "@/components/LazyImage";
import ABTestScenariosViewer from "@/components/ABTestScenariosViewer";
import TutorialGuide from "@/components/TutorialGuide";

const Container = styled.div`
  padding: 90px 20px 20px;
  font-family: "Arial", sans-serif;
  background-color: #f4f7f6;
  height: 100vh;
`;

const SectionContainer = styled.div`
  margin: 20px 0;
`;

const ContentBox = styled.div`
  background-color: #ffffff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h3`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const RankingList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RankingItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  margin-bottom: 15px;

  .rank {
    font-weight: bold;
    color: #555;
    width: 30px;
  }

  .name {
    flex-grow: 1;
    color: #444;
  }

  .count {
    font-weight: bold;
    color: #649eff;
  }
`;

const SurveyList = styled.div`
  margin-top: 10px;
`;

const SurveyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  &:hover {
    background-color: #f0f6ff;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(100, 158, 255, 0.2);
    border-color: #649eff;
  }
`;

const SurveyImage = styled(LazyImage)`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const SurveyContent = styled.div`
  flex: 1;
`;

const ProgressText = styled.div`
  font-size: 15px;
  color: #555;
  margin: 5px 0;
`;

const ProgressBar = styled.progress`
  width: 95%;
  height: 16px;
  margin-bottom: 5px;
  &::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 8px;
  }
  &::-webkit-progress-value {
    background-color: #649eff;
    border-radius: 8px;
  }
`;

const ContinueButton = styled.button`
  padding: 8px 14px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-left: auto;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4a82d9;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 16px;
  padding: 30px;
  line-height: 1.6;
`;

const ABTestButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.4s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
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

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
    animation: pulse 1.5s infinite;
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
    }
    50% {
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.7),
        0 0 20px rgba(102, 126, 234, 0.3);
    }
    100% {
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
    }
  }
`;

const ABTestDescription = styled.p`
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 0;
  line-height: 1.4;
`;

const MainContentContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RightColumn = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ScenarioButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const ScenarioButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})`
  width: 40px;
  height: 40px;
  border: 2px solid ${(props) => (props.isActive ? "#667eea" : "#ddd")};
  background-color: ${(props) => (props.isActive ? "#667eea" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#666")};
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background-color: ${(props) => (props.isActive ? "#667eea" : "#f0f6ff")};
    transform: scale(1.1);
  }
`;

const ScenarioContent = styled.div`
  margin-top: 15px;
  padding: 20px;
  background-color: #f8f9ff;
  border-radius: 10px;
  border-left: 4px solid #667eea;
`;

const ScenarioTitle = styled.h4`
  color: #333;
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: bold;
`;

const ScenarioDescription = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 12px 0;
`;

const ScenarioGuide = styled.div`
  background-color: #e8f4fd;
  border-left: 4px solid #4facfe;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.6;
  color: #2c5aa0;
  margin-top: 10px;

  &::before {
    content: "💡 테스트 방법: ";
    font-weight: bold;
    color: #1e4785;
  }
`;

const TestScenarioBox = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ActionButtonsRow = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 20px 25px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #ffffff;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 20px;
    transition: all 0.3s ease;
  }

  .text {
    transition: all 0.3s ease;
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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s ease;
  }

  &.data-evaluate {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);

    &:hover {
      background: linear-gradient(135deg, #ff5252 0%, #ff7043 100%);
      transform: translateY(-6px) scale(1.03);
      box-shadow: 0 12px 30px rgba(255, 107, 107, 0.6);
      animation: sparkle 2s infinite;

      .icon {
        transform: rotate(180deg) scale(1.2);
        filter: brightness(1.5);
      }
    }

    &:hover::after {
      left: 100%;
    }

    @keyframes sparkle {
      0%,
      100% {
        box-shadow: 0 12px 30px rgba(255, 107, 107, 0.6);
      }
      50% {
        box-shadow: 0 12px 30px rgba(255, 107, 107, 0.8),
          0 0 35px rgba(255, 107, 107, 0.4);
      }
    }
  }

  &.chart-view {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);

    &:hover {
      background: linear-gradient(135deg, #3b9cff 0%, #00d9ff 100%);
      transform: translateY(-6px) scale(1.03);
      box-shadow: 0 12px 30px rgba(79, 172, 254, 0.6);
      animation: chartGlow 2s infinite;

      .icon {
        transform: scale(1.3);
        filter: brightness(1.3);
      }
    }

    &:hover::after {
      left: 100%;
    }

    @keyframes chartGlow {
      0%,
      100% {
        box-shadow: 0 12px 30px rgba(79, 172, 254, 0.6);
      }
      50% {
        box-shadow: 0 12px 30px rgba(79, 172, 254, 0.8),
          0 0 35px rgba(0, 242, 254, 0.4);
      }
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const TitleText = styled.h3`
  font-size: 1.5em;
  color: #333;
  margin: 0;
`;

const RewardButton = styled.button`
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #ffed4e 0%, #ff9500 100%);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.5);
    animation: glow 1.5s infinite;
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 6px 20px rgba(255, 215, 0, 0.5);
    }
    50% {
      box-shadow: 0 6px 20px rgba(255, 215, 0, 0.7), 0 0 30px rgba(255, 215, 0, 0.3);
    }
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

const MainPage = () => {
  const [totalRanking, setTotalRanking] = useState([]);
  const [ongoingSurveys, setOngoingSurveys] = useState([]);
  const [isABTestModalOpen, setIsABTestModalOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axiosInstance.get("/api/ranking");
        if (response.data && response.data.success) {
          setTotalRanking(response.data.responseData);
        }
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      }
    };

    const fetchOngoingSurveys = async () => {
      try {
        const response = await axiosInstance.get("/api/surveys/ongoing");
        if (response.data && response.data.success) {
          setOngoingSurveys(response.data.responseData.onGoingList);
          console.log(
            "진행중인 설문조사 데이터:",
            response.data.responseData.onGoingList
          );
        }
      } catch (error) {
        console.error("Error fetching ongoing surveys:", error);
      }
    };

    const fetchUserInfo = async () => {
      const isLoggedIn = !!localStorage.getItem("user_id");
      if (!isLoggedIn) return;

      try {
        const response = await axiosInstance.get("/api/auth/me");
        if (response.data && response.data.success) {
          setUserInfo(response.data.responseData);
          // 사용자가 응답한 적이 없으면 튜토리얼 표시
          const userData = response.data.responseData;
          const hasResponses = userData.participatedSurvey.length > 0;
          if (!hasResponses) {
            setTimeout(() => setShowTutorial(true), 1500); // 1.5초 후 표시
          }
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchRanking();
    fetchOngoingSurveys();
    fetchUserInfo();
  }, []);

  const getRankIndicator = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  const getScenarioContent = (scenarioNum) => {
    const scenarios = {
      1: {
        title: "메인 페이지",
        description:
          "메인 페이지의 구성과 정보 배치가 직관적인지, 사용자가 원하는 기능을 쉽게 찾을 수 있는지 테스트해주세요.",
        guide:
          "상단의 '홈' 버튼을 클릭하여 메인 페이지로 이동 → 페이지 레이아웃과 정보 배치를 살펴보고 필요한 기능들을 쉽게 찾을 수 있는지 확인해주세요.",
      },
      2: {
        title: "설문조사 페이지",
        description:
          "여러 설문조사가 페이지로 나뉘어져 있는 구조에서 각 설문에 대한 접근성과 탐색의 편리성을 평가해주세요.",
        guide:
          "상단의 '데이터 평가' 버튼을 클릭 → 다양한 설문조사 목록을 살펴보고 → 원하는 설문을 찾아 참여하는 과정이 얼마나 편리한지 확인해주세요.",
      },
      3: {
        title: "차트 페이지",
        description:
          "각 차트가 의미하는 바가 명확한지, 그래프가 사용자에게 직관적으로 이해되는지 경험해주세요.",
        guide:
          "상단의 '차트 조회' 버튼을 클릭 → 다양한 차트들을 살펴보고 → 각 차트가 전달하고자 하는 정보를 쉽게 이해할 수 있는지 평가해주세요.",
      },
      4: {
        title: "마이페이지",
        description:
          "참여한 설문 표시, 설문 등록 기능, 등록된 설문의 UI가 직관적이고 사용하기 편리한지 평가해주세요.",
        guide:
          "상단의 '마이 페이지' 버튼을 클릭 → 참여한 설문 내역 확인 → 새로운 설문 등록 기능 사용 → 전체적인 개인 관리 기능이 얼마나 직관적인지 테스트해주세요.",
      },
      5: {
        title: "전반적인 검토",
        description:
          "전체 서비스의 UI/UX가 사용자에게 친숙한지, 불편하거나 사용하기 어려운 부분이 있는지 종합적으로 검토해주세요.",
        guide:
          "모든 페이지를 자유롭게 탐색하면서 → 전체적인 디자인 일관성 → 사용 편의성 → 불편하거나 개선이 필요한 부분을 종합적으로 평가해주세요.",
      },
    };

    const scenario = scenarios[scenarioNum];
    return (
      <div>
        <ScenarioTitle>
          {scenarioNum}. {scenario.title}
        </ScenarioTitle>
        <ScenarioDescription>{scenario.description}</ScenarioDescription>
        <ScenarioGuide>{scenario.guide}</ScenarioGuide>
      </div>
    );
  };

  const checkAuthAndNavigate = (path, state = null) => {
    const isLoggedIn = !!localStorage.getItem("user_id");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (state) {
      navigate(path, { state });
    } else {
      navigate(path);
    }
  };

  const handleSurveyClick = (item) => {
    console.log("Clicked survey item:", item);
    checkAuthAndNavigate(`/survey/${item.title}`, {
      image_url: item.imageUrl,
      captions: Array.isArray(item.captions) ? item.captions : [],
      country: item.country,
      category: item.category,
      title: item.title,
      Key: item.surveyId,
    });
  };

  const handleStartDataEvaluation = () => {
    checkAuthAndNavigate("/survey");
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <Container>
      <Header />

      <MainContentContainer>
        <LeftColumn>
          <TestScenarioBox>
            <ABTestButton onClick={() => setIsABTestModalOpen(true)}>
              테스트 시나리오 살펴보기
            </ABTestButton>
            <ABTestDescription>
              사용자 경험 개선을 위한 5가지 테스트 시나리오를 확인해보세요
            </ABTestDescription>

            <ScenarioButtonContainer>
              {[1, 2, 3, 4, 5].map((num) => (
                <ScenarioButton
                  key={num}
                  onClick={() => setSelectedScenario(num)}
                  isActive={selectedScenario === num}
                >
                  {num}
                </ScenarioButton>
              ))}
            </ScenarioButtonContainer>

            {selectedScenario && (
              <ScenarioContent>
                {getScenarioContent(selectedScenario)}
              </ScenarioContent>
            )}
          </TestScenarioBox>

          <ActionButtonsRow>
            <ActionButton
              className="data-evaluate"
              onClick={() => checkAuthAndNavigate("/survey")}
            >
              <span className="icon">✨</span>
              <span className="text">데이터 평가</span>
            </ActionButton>
            <ActionButton
              className="chart-view"
              onClick={() => checkAuthAndNavigate("/chart")}
            >
              <span className="icon">📊</span>
              <span className="text">차트 조회</span>
            </ActionButton>
          </ActionButtonsRow>
        </LeftColumn>

        <RightColumn>
          <TitleContainer>
            <TitleText>통합 순위</TitleText>
            <RewardButton onClick={() => setIsRewardModalOpen(true)}>
              🎁 참여 보상 및 점수 자세히보기
            </RewardButton>
          </TitleContainer>
          {totalRanking && totalRanking.length > 0 ? (
            <RankingList>
              {totalRanking.map((user) => (
                <RankingItem key={user.username}>
                  <span className="rank">{getRankIndicator(user.rank)}</span>
                  <span className="name">{user.username}</span>
                  <span className="count">{user.responseCount}점</span>
                </RankingItem>
              ))}
            </RankingList>
          ) : (
            <EmptyMessage>
              아무도 랭킹에 등록되지 않았습니다. 데이터 평가를 해서 순위에
              이름을 올려보세요!
            </EmptyMessage>
          )}
        </RightColumn>
      </MainContentContainer>

      <SectionContainer>
        <ContentBox>
          <Title>참여중인 설문조사</Title>
          {ongoingSurveys && ongoingSurveys.length > 0 ? (
            <SurveyList>
              {ongoingSurveys.map((survey) => {
                const percent = Math.round((survey.progress || 0) * 100);
                return (
                  <SurveyItem
                    key={survey.surveyId}
                    onClick={() => handleSurveyClick(survey)}
                  >
                    <SurveyImage src={survey.imageUrl} alt={survey.title} />
                    <SurveyContent>
                      <strong style={{ fontSize: "17px" }}>
                        {`${survey.country} > ${survey.category} > ${survey.title}`}
                      </strong>
                      <ProgressBar value={survey.progress || 0} max={1} />
                      <ProgressText>{`${percent}%`}</ProgressText>
                    </SurveyContent>
                    <ContinueButton>
                      {percent >= 100 ? "완료" : "이어서 진행하기"}
                    </ContinueButton>
                  </SurveyItem>
                );
              })}
            </SurveyList>
          ) : (
            <EmptyMessage>참여중인 설문조사가 없습니다.</EmptyMessage>
          )}
        </ContentBox>
      </SectionContainer>

      <ABTestScenariosViewer
        isOpen={isABTestModalOpen}
        onClose={() => setIsABTestModalOpen(false)}
      />

      <TutorialGuide
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
        onStartDataEvaluation={handleStartDataEvaluation}
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
                <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
                  📊 점수 적립 방식
                </h4>
                <p style={{ margin: '0 0 10px 0' }}>
                  데이터 평가를 진행하면 <HighlightText>한 캡션 문항마다 1점</HighlightText>을 얻을 수 있습니다.
                </p>
                <p style={{ margin: '0', color: '#666' }}>
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
    </Container>
  );
};

export default MainPage;
