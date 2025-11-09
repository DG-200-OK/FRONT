import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import AdministratorLayout from "@/layouts/AdministratorLayout";

// --- 💅 스타일드 컴포넌트(Styled Components) 정의 ---

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
  background: rgba(0, 0, 0, 0.3);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

/* '무한 로딩' 스피너 스타일 */
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #4a82d9; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spinAnimation} 1s linear infinite;
  margin: 20px auto;
`;

// --- 💻 React 컴포넌트 정의 ---

const Crawler = () => {
  // 폼 입력 상태
  const [seedUrl, setSeedUrl] = useState("Wikimedia");
  const [category, setCategory] = useState("");
  const [extension, setExtension] = useState("JPEG");
  const [keyword, setKeyword] = useState("");

  // 모달 및 API 상태
  const [isRunning, setIsRunning] = useState(false); // 모달창 표시 여부
  const [apiResult, setApiResult] = useState(null); // API 성공 결과
  const [apiError, setApiError] = useState(null); // API 실패 에러

  /**
   * '탐색하기' 버튼 클릭 시 실행되는 함수
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작(새로고침) 방지

    if (!category || !keyword) {
      alert("카테고리와 검색어를 모두 입력해주세요.");
      return;
    }

    // 모달을 '로딩' 상태로 표시
    setIsRunning(true);
    setApiResult(null); // 이전 API 결과 초기화
    setApiError(null); // 이전 API 에러 초기화

    console.log("✅ API 호출 시도 (GET /crawler-search)");

    // 💡 결과를 임시로 저장할 변수
    let tempResult = null;
    let tempError = null;

    try {
      const queryParams = new URLSearchParams({
        seedUrl: seedUrl,
        category: category,
        extension: extension,
        keyword: keyword,
      }).toString();

    const response = await fetch(
  `http://localhost:4000/crawler_search?${queryParams}`,
  { method: "GET" }
);


      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ API 결과 수신:", result);
      tempResult = result; // ⬅️ 결과를 임시 변수에 저장

    } catch (error) {
      console.error("❌ API 호출 실패:", error);
      tempError = error.message; // ⬅️ 에러를 임시 변수에 저장
    }

    // --- 💡 3초 딜레이 추가 ---
    console.log("API 응답 완료. 3초간 로딩 상태 유지...");
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3초 대기
    console.log("3초 딜레이 완료. 모달 상태 업데이트.");
    // -------------------------

    // 딜레이가 끝난 후, 임시 변수의 값으로 실제 상태 업데이트
    if (tempError) {
      setApiError(tempError);
    } else {
      setApiResult(tempResult);
    }
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
              {["architecture", "clothing", "cuisine", "tool"].map((cat) => (
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
            <Button type="submit" disabled={isRunning && !apiResult && !apiError}>
              탐색하기
            </Button>
          </ButtonGroup>
        </form>
      </Content>

      {/* 진행 모달 (API 상태에 따라 내용 변경) */}
      {isRunning && (
        <ModalOverlay>
          <ModalBox>
            
            {/* 1. API 에러가 발생한 경우 (실패) */}
            {apiError ? (
              <>
                <h3 style={{ color: "red" }}>❌ 탐색 실패</h3>
                <p style={{ wordBreak: "keep-all", margin: "15px 0" }}>
                  오류가 발생했습니다:
                  <br />
                  <strong>{apiError}</strong>
                </p>
                <ModalButtons>
                  <Button type="button" onClick={() => setIsRunning(false)}>
                    닫기
                  </Button>
                </ModalButtons>
              </>
            ) 
            /* 2. API 결과가 도착한 경우 (성공) */
            : apiResult ? (
              <>
                <h3 style={{ color: "green" }}>✅ 탐색 완료</h3>
                <p style={{ margin: "15px 0" }}>
                  크롤링 작업이 성공적으로 완료되었습니다.
                </p>
                <ModalButtons>
                  <Button type="button" onClick={() => setIsRunning(false)}>
                    닫기
                  </Button>
                </ModalButtons>
              </>
            ) 
            /* 3. API 응답을 기다리는 '무한 로딩' 상태 */
            : (
              <>
                <Spinner /> {/* 무한 로딩 스피너 */}
                <h3>진행중</h3>
                <p style={{ color: "#555" }}>
                  서버에서 데이터를 가져오는 중입니다...
                </p>
              </>
            )}

          </ModalBox>
        </ModalOverlay>
      )}
    </AdministratorLayout>
  );
};

export default Crawler;