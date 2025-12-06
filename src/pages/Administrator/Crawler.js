import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import AdministratorLayout from "@/layouts/AdministratorLayout";

/* ------------------- Styled Components ------------------- */

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

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3; 
  border-top: 8px solid #4a82d9;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spinAnimation} 1s linear infinite;
  margin: 20px auto;
`;

/* ------------------- React Component ------------------- */

const Crawler = () => {
  const [seedUrl, setSeedUrl] = useState("Wikimedia");
  const [category, setCategory] = useState("");
  const [extension, setExtension] = useState("JPEG");
  const [keyword, setKeyword] = useState("");

  const [isRunning, setIsRunning] = useState(false);
  const [apiResult, setApiResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!keyword) {
      alert("검색어를 입력해주세요.");
      return;
    }

    setIsRunning(true);
    setApiResult(null);
    setApiError(null);

    let tempResult = null;
    let tempError = null;

    try {
      console.log("🚀 /api/crawl 시작");

      const crawlRes = await fetch("https://api.culturelens.click/api/crawl/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: keyword }),
      });

      if (!crawlRes.ok) throw new Error(`크롤링 실패: ${crawlRes.status}`);

      console.log("🚀 /api/crawl/evaluate 시작");

      const evalRes = await fetch(
        "https://api.culturelens.click/api/crawl/evaluate",
        { method: "POST" }
      );

      if (!evalRes.ok)
        throw new Error(`평가 실패: ${evalRes.status}`);

      console.log("🚀 /api/crawl/data 가져오는 중…");

      const dataRes = await fetch(
        "https://api.culturelens.click/api/crawl/data",
        { method: "GET" }
      );

      if (!dataRes.ok)
        throw new Error(`데이터 조회 실패: ${dataRes.status}`);

      tempResult = await dataRes.json();
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);
      tempError = err.message;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

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
          <FormGroup>
            <Label>Seed URL</Label>
            <Select
              value={seedUrl}
              onChange={(e) => setSeedUrl(e.target.value)}
            >
              <option value="Wikimedia">Wikimedia</option>
              <option value="한국민속대백과사전">한국민속대백과사전</option>
              <option value="한국민족문화대백과사전">
                한국민족문화대백과사전
              </option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>카테고리</Label>
            <RadioGroup>
              {["architecture", "clothing", "cuisine", "tool"].map(
                (cat) => (
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
                )
              )}
            </RadioGroup>
          </FormGroup>

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

          <FormGroup>
            <Label>검색어</Label>
            <Input
              type="text"
              placeholder="예: 떡볶이"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </FormGroup>

          <ButtonGroup>
            <Button
              type="submit"
              disabled={isRunning && !apiResult && !apiError}
            >
              탐색하기
            </Button>
          </ButtonGroup>
        </form>
      </Content>

      {isRunning && (
        <ModalOverlay>
          <ModalBox>
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
            ) : apiResult ? (
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
            ) : (
              <>
                <Spinner />
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
