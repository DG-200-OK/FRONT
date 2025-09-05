import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader";
import BulgogiImg from "../../assets/img/bulgogi.png";

// --- Styled Components (from previous step) ---
const SurveyContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;
const SurveyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
`;
const SurveyBody = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const ImageSection = styled.div`
  flex: 1;
`;
const CaptionTitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 0;
`;
const SurveyImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  object-fit: cover;
`;
const EvaluationSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const DescriptionText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-top: 0;
  margin-bottom: 24px;
  min-height: 60px;
`;
const SliderGroup = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 12px;
    font-weight: 500;
  }
`;
const SliderWrapper = styled.div`
  position: relative;
`;
const SliderLabels = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
    padding: 0 5px;
`;
const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 20px;
  border-radius: 10px;
  background: #f1f1f1;
  outline: none;
  padding: 0;
  margin: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  &.cultural { background: #fffacd; }
  &.visual { background: #b0e0e6; }
  &.hallucination { background: #ffc0cb; }
`;
const SurveyFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
const NextButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 60px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  height: 100vh;
  background-color: #f0f8ff;
`;
const Container = styled.div`
  padding: 80px;
  max-width: 1200px;
  margin: 0 auto;
`;
const CompleteMessage = styled.div`
  font-size: 20px;
  color: #007bff;
  font-weight: bold;
  padding: 40px;
  text-align: center;
`;

// --- Refactored SurveyStart Component ---

const SurveyStart = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { image, captions = [], path, surveyId } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSurveyComplete, setIsSurveyComplete] = useState(false);
  const [sliderValues, setSliderValues] = useState({ cultural: 3, visual: 3, hallucination: 3 });

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    if (currentIndex >= captions.length && captions.length > 0) {
      setIsSurveyComplete(true);
    }
  }, [currentIndex, captions.length, navigate, userId]);

  const handleSliderChange = (type, value) => {
    setSliderValues(prev => ({
      ...prev,
      [type]: parseInt(value, 10)
    }));
  };

  const handleNext = async () => {
    if (isSurveyComplete) return;

    const currentCaption = captions[currentIndex];
    if (!currentCaption) {
        alert("현재 캡션 정보를 찾을 수 없습니다.");
        return;
    }

    const responsePayload = {
        ...sliderValues,
        user_id: parseInt(userId, 10),
        caption_id: currentCaption.Key
    };

    try {
        console.log("📡 응답 전송 시작...", responsePayload);
        const res = await fetch(`https://famous-blowfish-plainly.ngrok-free.app/api/surveys/responses/`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'ngrok-skip-browser-warning': 'true'
            },
            credentials: "include",
            body: JSON.stringify(responsePayload),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.detail || "응답 저장에 실패했습니다.");
        }

        console.log("✅ 응답 저장 성공");

        // Reset sliders for next question and move to next index
        setSliderValues({ cultural: 3, visual: 3, hallucination: 3 });
        setCurrentIndex(prev => prev + 1);

    } catch (err) {
        alert(`오류가 발생했습니다: ${err.message}`);
        console.error(err);
    }
  };

  const currentCaptionText = captions[currentIndex]?.text || "Loading caption...";

  return (
    <Wrapper>
      <CommonHeader />
      <Container>
        {isSurveyComplete ? (
          <CompleteMessage>
            설문이 완료되었습니다. 참여해주셔서 감사합니다!
          </CompleteMessage>
        ) : (
          <SurveyContainer>
            <SurveyHeader>
              <span className="category-path">{path || `... > ${title}`}</span>
              <span className="page-info">{currentIndex + 1} / {captions.length || 0}</span>
            </SurveyHeader>

            <SurveyBody>
              <ImageSection>
                <CaptionTitle>current caption : {currentCaptionText}</CaptionTitle>
                <SurveyImage src={image || BulgogiImg} alt={title} />
              </ImageSection>

              <EvaluationSection>
                <DescriptionText>
                  제시된 캡션이 이미지를 얼마나 잘 설명하는지, 문화적 맥락을 올바르게 반영하는지, 그리고 사실과 다른 정보(환각)를 포함하고 있는지 평가해주세요.
                </DescriptionText>
                
                <SliderGroup>
                  <label htmlFor="cultural">Cultural Appropriateness</label>
                  <SliderWrapper>
                    <Slider 
                      type="range" 
                      id="cultural" 
                      min="1" 
                      max="5" 
                      value={sliderValues.cultural}
                      onChange={(e) => handleSliderChange('cultural', e.target.value)}
                      className="slider cultural"
                    />
                    <SliderLabels><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></SliderLabels>
                  </SliderWrapper>
                </SliderGroup>

                <SliderGroup>
                  <label htmlFor="visual">Visual Detail</label>
                  <SliderWrapper>
                    <Slider 
                      type="range" 
                      id="visual" 
                      min="1" 
                      max="5" 
                      value={sliderValues.visual}
                      onChange={(e) => handleSliderChange('visual', e.target.value)}
                      className="slider visual"
                    />
                    <SliderLabels><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></SliderLabels>
                  </SliderWrapper>
                </SliderGroup>

                <SliderGroup>
                  <label htmlFor="hallucination">Hallucination</label>
                  <SliderWrapper>
                     <Slider 
                      type="range" 
                      id="hallucination" 
                      min="1" 
                      max="5" 
                      value={sliderValues.hallucination}
                      onChange={(e) => handleSliderChange('hallucination', e.target.value)}
                      className="slider hallucination"
                    />
                    <SliderLabels><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></SliderLabels>
                  </SliderWrapper>
                </SliderGroup>
              </EvaluationSection>
            </SurveyBody>

            <SurveyFooter>
              <NextButton onClick={handleNext}>
                {currentIndex === (captions.length || 0) - 1 ? "최종 제출하기" : "다음으로"}
              </NextButton>
            </SurveyFooter>
          </SurveyContainer>
        )}
      </Container>
    </Wrapper>
  );
};

export default SurveyStart;
