import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdministratorLayout from "@/layouts/AdministratorLayout";

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 15px;
  font-size: 16px;
  min-height: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
`;

const Input = styled.input`
  width: 200px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #68a0f4;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #4a82d9;
  }
`;

/* 진행 모달 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 420px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  text-align: center;
`;

const ProgressCircle = styled.div`
  position: relative;
  margin: 0 auto 20px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    #4a82d9 ${({ progress }) => progress * 3.6}deg,
    #eaeaea ${({ progress }) => progress * 3.6}deg
  );
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
  z-index: 0;

  /* 안쪽 흰색 원 (도넛 모양 만들기) */
  &::after {
    content: "";
    position: absolute;
    width: 85px;
    height: 85px;
    background: white;
    border-radius: 50%;
    z-index: 0; /* 숫자보다 아래로 */
  }

  /* 가운데 % 숫자 */
  span {
    position: absolute;
    font-size: 22px;
    font-weight: bold;
    color: #4a82d9;
    z-index: 1; /* 흰색 원보다 위로 */
  }
`;


const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

const Crawler = () => {
  const [seedUrl, setSeedUrl] = useState("Wikimedia");
  const [category, setCategory] = useState("");
  const [extension, setExtension] = useState("JPEG");
  const [keyword, setKeyword] = useState("");

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  // 진행률 시뮬레이션
  useEffect(() => {
    let timer;
    if (isRunning && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 5 : 100));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isRunning, progress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProgress(0);
    setIsRunning(true);
  };

  return (
    <AdministratorLayout>
      <Content>
        <SectionTitle>크롤러</SectionTitle>
        <form onSubmit={handleSubmit}>
          {/* Seed URL */}
          <FormGroup>
            <Label>Seed URL</Label>
            <Select value={seedUrl} onChange={(e) => setSeedUrl(e.target.value)}>
              <option value="Wikimedia">Wikimedia</option>
              <option value="한국민속대백과사전">한국민속대백과사전</option>
              <option value="한국민족문화대백과사전">한국민족문화대백과사전</option>
            </Select>
          </FormGroup>

          {/* 카테고리 */}
          <FormGroup>
            <Label>카테고리</Label>
            <RadioGroup>
              {["architecture", "clothing", "cuisine", "game", "tool"].map((cat) => (
                <label key={cat}>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={(e) => setCategory(e.target.value)}
                  />{" "}
                  {cat}
                </label>
              ))}
            </RadioGroup>
          </FormGroup>

          {/* 이미지 확장자 */}
          <FormGroup>
            <Label>이미지 확장자</Label>
            <RadioGroup>
              {["JPEG", "PNG"].map((ext) => (
                <label key={ext}>
                  <input
                    type="radio"
                    name="extension"
                    value={ext}
                    checked={extension === ext}
                    onChange={(e) => setExtension(e.target.value)}
                  />{" "}
                  {ext}
                </label>
              ))}
            </RadioGroup>
          </FormGroup>

          {/* 검색어 */}
          <FormGroup>
            <Label>검색어</Label>
            <Input
              type="text"
              placeholder="예: 떡볶이"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </FormGroup>

          {/* 버튼 */}
          <ButtonGroup>
            <Button type="submit">탐색하기</Button>
          </ButtonGroup>
        </form>
      </Content>

      {/* 진행 모달 */}
      {isRunning && (
        <ModalOverlay>
          <ModalBox>
            <ProgressCircle progress={progress}><span>{progress}%</span></ProgressCircle>
            <h3>진행중</h3>
            <p>소요된 시간: {Math.floor(progress / 10)}초 · 평균속도: {progress * 2}KB/s</p>
            <ModalButtons>
              {progress < 100 && (
                <Button type="button" onClick={() => setIsRunning(false)}>
                  중지
                </Button>
              )}
              {progress >= 100 && (
                <Button type="button" onClick={() => setIsRunning(false)}>
                  닫기
                </Button>
              )}
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}
    </AdministratorLayout>
  );
};

export default Crawler;
