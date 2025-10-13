import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonHeader from "@/components/CommonHeader";
import LazyImage from "@/components/LazyImage";
import axiosInstance from "@/axiosInstance";

const SurveyContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;
const ProgressWrapper = styled.div`
  margin-bottom: 20px;
`;

const TotalScore = styled.div`
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: bold;
`;
const SurveyFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const Container = styled.div`
  padding: 100px 80px 80px 80px; // Increased top padding
  max-width: 1200px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  background-color: #f0f8ff;
`;

const NextButton = styled.button`
  background: #1064ff;
  color: #ffffff;
  border: 0;
  padding: 12px 56px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(16, 100, 255, 0.22);
  transition: transform 0.06s ease, box-shadow 0.12s ease, background 0.2s ease;
  &:hover {
    background: #0b51d9;
    box-shadow: 0 8px 18px rgba(16, 81, 217, 0.28);
  }
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    background: #98a2b3;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const CompleteMessage = styled.div`
  font-size: 20px;
  color: #1064ff;
  font-weight: 700;
  padding: 48px 16px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #e5eaf0;
  border-radius: 14px;
`;

function splitBreadcrumb(path, fallbackTitle) {
  const raw = (path || "").trim();
  if (!raw) return ["Korea", fallbackTitle].filter(Boolean);
  return raw
    .split(">")
    .map((s) => s.trim())
    .filter(Boolean);
}

const scaleMeta = {
  cultural: {
    title: "문화적 적절성",
    help: "캡션이 유물의 문화적 정보(이름, 국가, 문화적 맥락 등)를 얼마나 정확하고 충분한 세부사항으로 기술하는지 평가하세요.",
    labels: [
      "1.부정확하게 서술함",
      "2.서술하지 않음",
      "3.다소 서술함",
      "4.대체로 서술함",
      "5.상세히 서술함",
    ],
    bg: "#FFEE67",
  },
  visual: {
    title: "시각적 세부사항",
    help: "캡션이 유물의 시각적 요소(모양, 색상 및 기타 관찰 가능한 특징)를 얼마나 구체적으로 기술하는지 평가하세요.",
    labels: [
      "1.부정확하게 서술함",
      "2.서술하지 않음",
      "3.다소 서술함",
      "4.대체로 서술함",
      "5.상세히 서술함",
    ],
    bg: "#BAF1FF",
  },
  hallucination: {
    title: "환각",
    help: "지식이나 문화적 관습 같이 시각적으로 확인할 수 없는 정보가 캡션에 얼마나 포함되어 있는지 평가하세요.",
    labels: [
      "1.전혀 없음",
      "2.약간 있음",
      "3.다소 있음",
      "4.대부분 있음",
      "5.완전히 있음",
    ],
    bg: "#FFD1DB",
  },
};

const SurveyTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;
const Breadcrumbs = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
  span.crumb {
    background: #f2f4f7;
    color: #475467;
    border: 1px solid #e5eaf0;
    border-radius: 8px;
    padding: 6px 10px;
    line-height: 1;
  }
  span.sep {
    color: #98a2b3;
  }
`;
const PageInfo = styled.div`
  color: #667085;
  font-size: 14px;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 24px;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPanel = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: 16px;
`;
const ImageCard = styled.div`
  background: #fff;
  border: 1px solid #e5eaf0;
  border-radius: 12px;
  padding: 14px;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 520px;
  object-fit: cover;
  border-radius: 10px;
`;
const CaptionCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5eaf0;
  border-radius: 12px;
  padding: 14px 16px;
`;
const CaptionHeader = styled.div`
  font-size: 13px;
  color: #667085;
  margin-bottom: 8px;
`;
const CaptionText = styled.div`
  background: #fff;
  border: 1px solid #e5eaf0;
  border-radius: 10px;
  padding: 14px 16px;
  color: #344054;
  line-height: 1.65;
`;

const RightPanel = styled.div`
  display: grid;
  gap: 16px;
`;
const Section = styled.section`
  border: 1px solid #e5eaf0;
  border-radius: 12px;
  padding: 16px 16px 12px;
  background: #f9fafb;
`;
const SectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
  color: #101828;
`;
const HelpText = styled.p`
  margin: 0 0 16px;
  color: #475467;
  font-size: 14px;
  line-height: 1.6;
`;
const SliderWrap = styled.div`
  padding: 8px 10px 12px;
  border-radius: 12px;
  background: white;
  border: 1px solid #f5f5f5;

  input[type="range"]::-webkit-slider-thumb {
    transition: box-shadow 0.3s ease-in-out;
  }
  input[type="range"]::-moz-range-thumb {
    transition: box-shadow 0.3s ease-in-out;
  }

  &:hover input[type="range"]::-webkit-slider-thumb {
    box-shadow:
      0 0 5px ${(p) => p.$bg || "#d0d5dd"},
      0 0 10px ${(p) => p.$bg || "#d0d5dd"},
      0 0 20px ${(p) => p.$bg || "#d0d5dd"};
  }

  &:hover input[type="range"]::-moz-range-thumb {
    box-shadow:
      0 0 5px ${(p) => p.$bg || "#d0d5dd"},
      0 0 10px ${(p) => p.$bg || "#d0d5dd"},
      0 0 20px ${(p) => p.$bg || "#d0d5dd"};
  }
`;

const SliderRail = styled.div`
  position: relative;
  height: 32px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 8px;
    background: #e6edf5;
    border-radius: 999px;
    pointer-events: none;
  }
`;

const Scale = styled.input.attrs({ type: "range", min: 1, max: 5, step: 1 })`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 7%;
  width: 87%;
  margin: 0;
  cursor: pointer;

  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;
  &:active { cursor: grabbing; }

  &::-webkit-slider-runnable-track {
    height: 8px;
    background: transparent;
    border-radius: 999px;
  }
  &::-moz-range-track {
    height: 8px;
    background: transparent;
    border-radius: 999px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    background: #ffffff;
    border: 1.5px solid ${(p) => p.$bg || "#d0d5dd"};
    border-radius: 50%;
    /* box-shadow:
      0 0 5px ${(p) => p.$bg || "#d0d5dd"},
      0 0 10px ${(p) => p.$bg || "#d0d5dd"},
      0 0 20px ${(p) => p.$bg || "#d0d5dd"}; */
    box-shadow: 0 2px 6px rgba(16, 24, 40, 0.12);
    margin-top: -7px;
    /* cursor: pointer; */
    cursor: grab;
  }
  &:active::-webkit-slider-thumb { cursor: grabbing; }

  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    /* background: #ffffff;
    border: 1px solid #d0d5dd; */
    background: ${(p) => p.$bg || "#ffffff"};
    border: 1px solid ${(p) => p.$bg || "#d0d5dd"};
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(16, 24, 40, 0.12);
    /* cursor: pointer; */
    cursor: grab;
  }
  &:active::-moz-range-thumb { cursor: grabbing; }
`;

const ScaleLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: #667085;
  span {
    text-align: center;
  }
`;

const SurveyStart = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    image,
    captions: captionsFromLocation = [],
    path,
    surveyId,
    startIndex,
  } = location.state || {};

  const captions = useMemo(() => {
    if (!surveyId) return captionsFromLocation;
    try {
      const item = sessionStorage.getItem(`survey_${surveyId}_captions`);
      const stored = item ? JSON.parse(item) : null;
      return stored && stored.length > 0 ? stored : captionsFromLocation;
    } catch (e) {
      console.error("Failed to parse captions from sessionStorage", e);
      return captionsFromLocation;
    }
  }, [surveyId, captionsFromLocation]);

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isSurveyComplete, setIsSurveyComplete] = useState(false);
  const [sliderValues, setSliderValues] = useState({
    cultural: 3,
    visual: 3,
    hallucination: 3,
  });
  const [startTime, setStartTime] = useState(Date.now());
  const crumbs = useMemo(() => splitBreadcrumb(path, title), [path, title]);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    if (currentIndex >= captions.length && captions.length > 0) {
      setIsSurveyComplete(true);
    }
    setStartTime(Date.now());
  }, [currentIndex, captions.length, navigate, userId]);

  const handleSliderChange = (type, value) => {
    setSliderValues((prev) => ({
      ...prev,
      [type]: parseInt(value, 10),
    }));
  };

  const handleNext = async () => {
    if (isSurveyComplete) return;

    const responseTime = (Date.now() - startTime) / 1000;

    const currentCaption = captions[currentIndex];
    if (!currentCaption) {
      alert("현재 캡션 정보를 찾을 수 없습니다.");
      return;
    }

    const responsePayload = {
      ...sliderValues,
      userId: parseInt(userId, 10),
      captionId: currentCaption.captionId,
      responseTime: responseTime,
    };

    try {
      await axiosInstance.post("/api/surveys/response/", responsePayload, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        withCredentials: true,
      });

      toast.success("다음 캡션으로 이동합니다! +1점 획득 ✨");
      setSliderValues({ cultural: 3, visual: 3, hallucination: 3 });
      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "응답 저장에 실패했습니다.";
      alert(`오류가 발생했습니다: ${errorMessage}`);
      console.error(err);
    }
  };

  const currentCaptionText =
    captions[currentIndex]?.text || "Loading caption...";

  return (
    <Wrapper>
      <ToastContainer />
      <CommonHeader />
      <Container>
        {isSurveyComplete ? (
          <>
            <ProgressWrapper>
              <ProgressBar
                percent={100}
                filledBackground="linear-gradient(to right, #86e3ce, #d0e6a5)"
                height="15px"
              />
            </ProgressWrapper>
            <CompleteMessage>
              설문이 완료되었습니다. 참여해주셔서 감사합니다!
              <TotalScore>총 {captions.length}점을 획득하셨습니다!</TotalScore>
            </CompleteMessage>
          </>
        ) : (
          <SurveyContainer>
            <ProgressWrapper>
              <ProgressBar
                percent={(currentIndex / (captions.length || 1)) * 100}
                filledBackground="linear-gradient(to right, #86e3ce, #d0e6a5)"
                height="15px"
              />
            </ProgressWrapper>
            <SurveyTop>
              <Breadcrumbs aria-label="breadcrumb">
                {crumbs.map((c, idx) => (
                  <React.Fragment key={`${c}-${idx}`}>
                    <span className="crumb">{c}</span>
                    {idx < crumbs.length - 1 && <span className="sep">›</span>}
                  </React.Fragment>
                ))}
              </Breadcrumbs>
              <PageInfo>
                {Math.min(currentIndex + 1, captions.length || 0)} /{" "}
                {captions.length || 0}
              </PageInfo>
            </SurveyTop>

            <Body>
              <LeftPanel>
                <ImageCard>
                  <LazyImage
                    src={image}
                    alt={title || "survey image"}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />
                </ImageCard>

                <CaptionCard>
                  <CaptionHeader>현재 캡션</CaptionHeader>
                  <CaptionText>{currentCaptionText}</CaptionText>
                </CaptionCard>
              </LeftPanel>

              <RightPanel>
                <Section>
                  <SectionTitle>{scaleMeta.cultural.title}</SectionTitle>
                  <HelpText>{scaleMeta.cultural.help}</HelpText>
                  <SliderWrap>
                    <SliderRail>
                      <Scale
                        value={sliderValues.cultural}
                        onChange={(e) =>
                          handleSliderChange("cultural", e.target.value)
                        }
                        aria-label="문화적 적절성"
                        $bg={scaleMeta.cultural.bg}
                      />
                    </SliderRail>
                    <ScaleLabels>
                      {scaleMeta.cultural.labels.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </ScaleLabels>
                  </SliderWrap>
                </Section>
                <Section>
                  <SectionTitle>{scaleMeta.visual.title}</SectionTitle>
                  <HelpText>{scaleMeta.visual.help}</HelpText>
                  <SliderWrap>
                    <SliderRail>
                      <Scale
                        value={sliderValues.visual}
                        onChange={(e) =>
                          handleSliderChange("visual", e.target.value)
                        }
                        aria-label="시각적 세부사항"
                        $bg={scaleMeta.visual.bg}
                      />
                    </SliderRail>
                    <ScaleLabels>
                      {scaleMeta.visual.labels.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </ScaleLabels>
                  </SliderWrap>
                </Section>
                <Section>
                  <SectionTitle>{scaleMeta.hallucination.title}</SectionTitle>
                  <HelpText>{scaleMeta.hallucination.help}</HelpText>
                  <SliderWrap>
                    <SliderRail>
                      <Scale
                        value={sliderValues.hallucination}
                        onChange={(e) =>
                          handleSliderChange("hallucination", e.target.value)
                        }
                        aria-label="환각"
                        $bg={scaleMeta.hallucination.bg}
                      />
                    </SliderRail>
                    <ScaleLabels>
                      {scaleMeta.hallucination.labels.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </ScaleLabels>
                  </SliderWrap>
                </Section>
              </RightPanel>
            </Body>

            <SurveyFooter>
              <NextButton onClick={handleNext}>
                {currentIndex === (captions.length || 0) - 1
                  ? "최종 제출하기"
                  : "다음으로"}
              </NextButton>
            </SurveyFooter>
          </SurveyContainer>
        )}
      </Container>
    </Wrapper>
  );
};

export default SurveyStart;
